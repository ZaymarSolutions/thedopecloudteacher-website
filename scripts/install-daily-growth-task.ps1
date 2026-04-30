param(
  [string]$TaskName = "DCT-Daily-Growth-Ops",
  [string]$RunTime = "07:30"
)

$ErrorActionPreference = "Stop"

$scriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$runScript = Join-Path $scriptRoot "run-daily-growth-ops.ps1"

if (-not (Test-Path $runScript)) {
  throw "Cannot find run script at $runScript"
}

$taskCommand = "powershell.exe"
$taskArgs = "-NoProfile -ExecutionPolicy Bypass -File `"$runScript`""

schtasks /Create /F /SC DAILY /TN $TaskName /TR "$taskCommand $taskArgs" /ST $RunTime | Out-Host

Write-Host "Scheduled task '$TaskName' installed for daily run at $RunTime." -ForegroundColor Green
Write-Host "To remove it later: schtasks /Delete /TN $TaskName /F" -ForegroundColor Yellow
