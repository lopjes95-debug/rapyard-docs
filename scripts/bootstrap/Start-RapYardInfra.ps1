<#
    Start-RapYardInfra.ps1
    RapYard Infra Dev Console
#>

$ErrorActionPreference = 'Stop'

$ScriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $ScriptRoot

$InfraPath = "$ScriptRoot\infra"

function Write-Title { param([string]$Text)
    Write-Host ""
    Write-Host "────────────────────────────────────────────────────────────" -ForegroundColor DarkGray
    Write-Host " $Text" -ForegroundColor Cyan
    Write-Host "────────────────────────────────────────────────────────────" -ForegroundColor DarkGray
}
function Write-Info { param([string]$Text) Write-Host "[i] $Text" -ForegroundColor Gray }
function Write-Success { param([string]$Text) Write-Host "[✓] $Text" -ForegroundColor Green }
function Write-Warn { param([string]$Text) Write-Host "[!] $Text" -ForegroundColor DarkYellow }

function Pause-ForKey {
    Write-Host ""
    Write-Host "Press any key to return to the Infra console..." -ForegroundColor DarkGray
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
}

function Invoke-InInfra {
    param([string]$Command)
    Push-Location $InfraPath
    try {
        Write-Info "Running in infra: $Command"
        Invoke-Expression $Command
    }
    finally {
        Pop-Location
    }
}

function Show-Banner {
    Clear-Host
    Write-Host ""
    Write-Host "   ██╗███╗   ██╗███████╗██████╗  █████╗ " -ForegroundColor DarkCyan
    Write-Host "   ██║████╗  ██║██╔════╝██╔══██╗██╔══██╗" -ForegroundColor DarkCyan
    Write-Host "   ██║██╔██╗ ██║█████╗  ██████╔╝███████║" -ForegroundColor Cyan
    Write-Host "   ██║██║╚██╗██║██╔══╝  ██╔══██╗██╔══██║" -ForegroundColor Cyan
    Write-Host "   ██║██║ ╚████║███████╗██║  ██║██║  ██║" -ForegroundColor White
    Write-Host "   ╚═╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝" -ForegroundColor DarkGray
    Write-Host ""
    Write-Host "   RAPYARD INFRA DEV CONSOLE" -ForegroundColor DarkGray
    Write-Host ""
}

function Infra-Dev {
    Write-Title "Start Infra Dev (e.g. localstack/docker-compose)"
    Invoke-InInfra "pnpm dev"
    Pause-ForKey
}

function Infra-Apply {
    Write-Title "Apply Infra (e.g. terraform/apply)"
    Invoke-InInfra "pnpm apply"
    Pause-ForKey
}

function Infra-Plan {
    Write-Title "Plan Infra"
    Invoke-InInfra "pnpm plan"
    Pause-ForKey
}

function Show-Menu {
    Show-Banner
    Write-Host "1) Start infra dev" -ForegroundColor Cyan
    Write-Host "2) Plan infra" -ForegroundColor Yellow
    Write-Host "3) Apply infra" -ForegroundColor Green
    Write-Host "4) Exit" -ForegroundColor DarkGray
    Write-Host ""
}

while ($true) {
    Show-Menu
    $choice = Read-Host "Select an option"

    switch ($choice) {
        "1" { Infra-Dev }
        "2" { Infra-Plan }
        "3" { Infra-Apply }
        "4" { break }
        default { Write-Warn "Invalid option" }
    }
}
