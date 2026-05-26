<#
    ry.ps1
    Unified RapYard CLI
#>

param(
    [Parameter(Position=0)]
    [string]$Command,
    [Parameter(Position=1)]
    [string]$SubCommand
)

$ErrorActionPreference = 'Stop'

$ScriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $ScriptRoot

function Show-Help {
    Write-Host ""
    Write-Host "RAPYARD CLI (ry)" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Usage:" -ForegroundColor Gray
    Write-Host "  ry frontend            # Open frontend dev console"
    Write-Host "  ry api                 # Open API dev console"
    Write-Host "  ry workers             # Open workers dev console"
    Write-Host "  ry infra               # Open infra dev console"
    Write-Host "  ry full-dev            # Start full dev stack (frontend+api+workers+supabase)"
    Write-Host "  ry help                # Show this help"
    Write-Host ""
}

function Start-FrontendConsole {
    & "$ScriptRoot\Start-RapYardFrontend.ps1"
}

function Start-ApiConsole {
    & "$ScriptRoot\Start-RapYardAPI.ps1"
}

function Start-WorkersConsole {
    & "$ScriptRoot\Start-RapYardWorkers.ps1"
}

function Start-InfraConsole {
    & "$ScriptRoot\Start-RapYardInfra.ps1"
}

function Start-FullDev {
    Write-Host ""
    Write-Host "Launching FULL RAPYARD DEV STACK..." -ForegroundColor Cyan

    Start-Job { pwsh -File "$using:ScriptRoot\Start-RapYardFrontend.ps1" }
    Start-Job { pwsh -File "$using:ScriptRoot\Start-RapYardAPI.ps1" }
    Start-Job { pwsh -File "$using:ScriptRoot\Start-RapYardWorkers.ps1" }

    Write-Host "[✓] Frontend, API, and Workers consoles launched in background jobs." -ForegroundColor Green
    Write-Host "Open Supabase separately if not already running." -ForegroundColor Gray
}

if (-not $Command) {
    Show-Help
    exit 0
}

switch ($Command.ToLower()) {
    "frontend" { Start-FrontendConsole }
    "api"      { Start-ApiConsole }
    "workers"  { Start-WorkersConsole }
    "infra"    { Start-InfraConsole }
    "full-dev" { Start-FullDev }
    "help"     { Show-Help }
    default {
        Write-Host "Unknown command: $Command" -ForegroundColor Red
        Show-Help
    }
}
