<#
    Start-RapYardAPI.ps1
    RapYard API Dev Console
#>

$ErrorActionPreference = 'Stop'

$ScriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $ScriptRoot

$ApiPath = "$ScriptRoot\apps\api"

function Write-Title {
    param([string]$Text)
    Write-Host ""
    Write-Host "────────────────────────────────────────────────────────────" -ForegroundColor DarkGray
    Write-Host " $Text" -ForegroundColor Cyan
    Write-Host "────────────────────────────────────────────────────────────" -ForegroundColor DarkGray
}

function Write-Info { param([string]$Text) Write-Host "[i] $Text" -ForegroundColor Gray }
function Write-Success { param([string]$Text) Write-Host "[✓] $Text" -ForegroundColor Green }
function Write-Warn { param([string]$Text) Write-Host "[!] $Text" -ForegroundColor DarkYellow }
function Write-ErrorLine { param([string]$Text) Write-Host "[x] $Text" -ForegroundColor Red }

function Pause-ForKey {
    Write-Host ""
    Write-Host "Press any key to return to the API console..." -ForegroundColor DarkGray
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
}

function Invoke-InApi {
    param([string]$Command)
    Push-Location $ApiPath
    try {
        Write-Info "Running in API: $Command"
        Invoke-Expression $Command
    }
    finally {
        Pop-Location
    }
}

function Show-Banner {
    Clear-Host
    Write-Host ""
    Write-Host "   ██████╗  █████╗ ██████╗ ██╗   ██╗" -ForegroundColor DarkCyan
    Write-Host "   ██╔══██╗██╔══██╗██╔══██╗██║   ██║" -ForegroundColor DarkCyan
    Write-Host "   ██████╔╝███████║██████╔╝██║   ██║" -ForegroundColor Cyan
    Write-Host "   ██╔══██╗██╔══██║██╔══██╗╚██╗ ██╔╝" -ForegroundColor Cyan
    Write-Host "   ██████╔╝██║  ██║██║  ██║ ╚████╔╝ " -ForegroundColor White
    Write-Host "   ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝  ╚═══╝  " -ForegroundColor DarkGray
    Write-Host ""
    Write-Host "   RAPYARD API DEV CONSOLE" -ForegroundColor DarkGray
    Write-Host ""
}

function Api-Dev {
    Write-Title "Start API Dev Server"
    Invoke-InApi "pnpm dev"
    Pause-ForKey
}

function Api-Test {
    Write-Title "Run API Tests"
    Invoke-InApi "pnpm test"
    Pause-ForKey
}

function Api-Lint {
    Write-Title "Lint API"
    Invoke-InApi "pnpm lint"
    Pause-ForKey
}

function Api-Install {
    Write-Title "Install API Dependencies"
    Invoke-InApi "pnpm install"
    Write-Success "API dependencies installed"
    Pause-ForKey
}

function Show-Menu {
    Show-Banner
    Write-Host "1) Start API dev server" -ForegroundColor Cyan
    Write-Host "2) Run API tests" -ForegroundColor Yellow
    Write-Host "3) Lint API" -ForegroundColor Magenta
    Write-Host "4) Install API dependencies" -ForegroundColor Green
    Write-Host "5) Exit" -ForegroundColor DarkGray
    Write-Host ""
}

while ($true) {
    Show-Menu
    $choice = Read-Host "Select an option"

    switch ($choice) {
        "1" { Api-Dev }
        "2" { Api-Test }
        "3" { Api-Lint }
        "4" { Api-Install }
        "5" { break }
        default { Write-Warn "Invalid option" }
    }
}
