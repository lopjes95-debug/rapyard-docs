<#
    Start-RapYardWorkers.ps1
    RapYard Workers Dev Console
#>

$ErrorActionPreference = 'Stop'

$ScriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $ScriptRoot

$WorkersPath = "$ScriptRoot\apps\workers"

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
    Write-Host "Press any key to return to the Workers console..." -ForegroundColor DarkGray
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
}

function Invoke-InWorkers {
    param([string]$Command)
    Push-Location $WorkersPath
    try {
        Write-Info "Running in workers: $Command"
        Invoke-Expression $Command
    }
    finally {
        Pop-Location
    }
}

function Show-Banner {
    Clear-Host
    Write-Host ""
    Write-Host "   ██╗    ██╗ ██████╗ ██████╗ ██╗  ██╗███████╗██████╗ ███████╗" -ForegroundColor DarkCyan
    Write-Host "   ██║    ██║██╔═══██╗██╔══██╗██║ ██╔╝██╔════╝██╔══██╗██╔════╝" -ForegroundColor DarkCyan
    Write-Host "   ██║ █╗ ██║██║   ██║██████╔╝█████╔╝ █████╗  ██████╔╝█████╗  " -ForegroundColor Cyan
    Write-Host "   ██║███╗██║██║   ██║██╔══██╗██╔═██╗ ██╔══╝  ██╔══██╗██╔══╝  " -ForegroundColor Cyan
    Write-Host "   ╚███╔███╔╝╚██████╔╝██║  ██║██║  ██╗███████╗██║  ██║███████╗" -ForegroundColor White
    Write-Host "    ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝" -ForegroundColor DarkGray
    Write-Host ""
    Write-Host "   RAPYARD WORKERS DEV CONSOLE" -ForegroundColor DarkGray
    Write-Host ""
}

function Workers-Dev {
    Write-Title "Start Workers Dev"
    Invoke-InWorkers "pnpm dev"
    Pause-ForKey
}

function Workers-QueueMonitor {
    Write-Title "Start Queue Monitor"
    Invoke-InWorkers "pnpm queue:monitor"
    Pause-ForKey
}

function Workers-Install {
    Write-Title "Install Workers Dependencies"
    Invoke-InWorkers "pnpm install"
    Write-Success "Workers dependencies installed"
    Pause-ForKey
}

function Show-Menu {
    Show-Banner
    Write-Host "1) Start workers dev" -ForegroundColor Cyan
    Write-Host "2) Start queue monitor" -ForegroundColor Yellow
    Write-Host "3) Install workers dependencies" -ForegroundColor Green
    Write-Host "4) Exit" -ForegroundColor DarkGray
    Write-Host ""
}

while ($true) {
    Show-Menu
    $choice = Read-Host "Select an option"

    switch ($choice) {
        "1" { Workers-Dev }
        "2" { Workers-QueueMonitor }
        "3" { Workers-Install }
        "4" { break }
        default { Write-Warn "Invalid option" }
    }
}
