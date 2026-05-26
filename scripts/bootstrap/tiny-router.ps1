param(
    [string]$Root = "$(Resolve-Path "$PSScriptRoot/..")"
)

Write-Host "🔧 RapYard Tiny Router — Auto‑Wire Bootstrap" -ForegroundColor Cyan
Write-Host "Root: $Root"
Write-Host ""

$appsPath = Join-Path $Root "apps"
$packageName = "@rapyard/tiny-router"

# ---------------------------------------------------------
# 1. Detect all apps
# ---------------------------------------------------------
$apps = Get-ChildItem -Path $appsPath -Directory
if ($apps.Count -eq 0) {
    Write-Host "❌ No apps found under /apps" -ForegroundColor Red
    exit 1
}

Write-Host "📦 Found apps:"
$apps | ForEach-Object { Write-Host " - $($_.Name)" }
Write-Host ""

# ---------------------------------------------------------
# 2. Ensure tiny-router is installed at root
# ---------------------------------------------------------
Write-Host "🔍 Checking tiny-router installation..."
$rootPackageJson = Join-Path $Root "package.json"
$rootPackage = Get-Content $rootPackageJson | ConvertFrom-Json

if (-not $rootPackage.dependencies.$packageName -and -not $rootPackage.devDependencies.$packageName) {
    Write-Host "⚠️ tiny-router missing — installing..."
    npm install $packageName --workspace-root
    Write-Host "✅ tiny-router installed"
} else {
    Write-Host "✅ tiny-router already installed"
}

Write-Host ""

# ---------------------------------------------------------
# 3. Process each app
# ---------------------------------------------------------
foreach ($app in $apps) {
    $appName = $app.Name
    $appPath = $app.FullName
    $routerPath = Join-Path $appPath "router"

    Write-Host "🚀 Processing app: $appName" -ForegroundColor Yellow

    # Ensure router folder exists
    if (-not (Test-Path $routerPath)) {
        Write-Host "📁 Creating router folder..."
        New-Item -ItemType Directory -Path $routerPath | Out-Null
    }

    # Ensure required files exist
    $requiredFiles = @(
        "routes.ts",
        "index.ts",
        "types.ts"
    )

    foreach ($file in $requiredFiles) {
        $filePath = Join-Path $routerPath $file
        if (-not (Test-Path $filePath)) {
            Write-Host "📝 Creating $file..."
            @"
import { defineRoutes } from "$packageName";

export const routes = defineRoutes({
    home: "/",
});
"@ | Out-File $filePath -Encoding utf8
        }
    }

    # ---------------------------------------------------------
    # 4. Auto-wire into app entry file
    # ---------------------------------------------------------
    $entryCandidates = @(
        "src/app.tsx",
        "src/index.tsx",
        "src/main.tsx",
        "app/layout.tsx",
        "app/page.tsx"
    )

    $entryFile = $null
    foreach ($candidate in $entryCandidates) {
        $candidatePath = Join-Path $appPath $candidate
        if (Test-Path $candidatePath) {
            $entryFile = $candidatePath
            break
        }
    }

    if ($entryFile) {
        Write-Host "🔌 Wiring router into: $entryFile"

        $content = Get-Content $entryFile -Raw

        if ($content -notmatch $packageName) {
            Write-Host "➕ Adding import..."
            $import = "import { createRouter } from '$packageName';"
            $content = "$import`n$content"
            Set-Content -Path $entryFile -Value $content -Encoding utf8
        } else {
            Write-Host "✔ Import already exists"
        }
    } else {
        Write-Host "⚠️ No entry file found — skipping auto-wire"
    }

    Write-Host "✔ Finished $appName"
    Write-Host ""
}

Write-Host "🎉 Tiny Router Auto‑Wire Complete"