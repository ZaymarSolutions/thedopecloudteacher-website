param(
  [string]$NodeCommand = "node"
)

$ErrorActionPreference = "Stop"

$scriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$repoRoot = Resolve-Path (Join-Path $scriptRoot "..")
$runner = Join-Path $scriptRoot "daily-growth-ops.cjs"

if (-not (Test-Path $runner)) {
  throw "Cannot find runner script at $runner"
}

Write-Host "Running daily growth operations..." -ForegroundColor Cyan
& $NodeCommand $runner

if ($LASTEXITCODE -ne 0) {
  throw "Daily growth operations failed with exit code $LASTEXITCODE"
}

Write-Host "Daily growth operations completed." -ForegroundColor Green
