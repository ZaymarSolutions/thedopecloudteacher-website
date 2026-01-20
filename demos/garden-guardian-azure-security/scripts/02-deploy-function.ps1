# ============================================================
# Garden Guardian - Deploy Azure Function (PowerShell)
# ============================================================
# This script deploys the function code to Azure
# Prerequisites: Run 01-setup-infrastructure.ps1 first
# ============================================================

$ErrorActionPreference = "Stop"

# Configuration
$RESOURCE_GROUP = "rg-garden-guardian"
$FUNCTION_APP = "func-garden-guardian"

Write-Host "╔═══════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   🚀 Deploying Garden Guardian Function 🚀           ║" -ForegroundColor Cyan
Write-Host "╚═══════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Check if function app exists
Write-Host "[1/4] Verifying Function App exists..." -ForegroundColor Cyan
try {
    $null = az functionapp show --name $FUNCTION_APP --resource-group $RESOURCE_GROUP 2>$null
    Write-Host "   ✓ Function App found" -ForegroundColor Green
}
catch {
    Write-Host "❌ Error: Function App not found" -ForegroundColor Red
    Write-Host "   Please run 01-setup-infrastructure.ps1 first" -ForegroundColor Yellow
    exit 1
}

# Navigate to function directory
Write-Host ""
Write-Host "[2/4] Preparing function code..." -ForegroundColor Cyan
$originalLocation = Get-Location
Set-Location "$PSScriptRoot\..\azure-function"

# Check if required files exist
if (-not (Test-Path "function_app.py")) {
    Write-Host "❌ Error: function_app.py not found" -ForegroundColor Red
    Set-Location $originalLocation
    exit 1
}
if (-not (Test-Path "requirements.txt")) {
    Write-Host "❌ Error: requirements.txt not found" -ForegroundColor Red
    Set-Location $originalLocation
    exit 1
}
Write-Host "   ✓ Function code validated" -ForegroundColor Green

# Deploy to Azure
Write-Host ""
Write-Host "[3/4] Deploying to Azure (this may take 2-3 minutes)..." -ForegroundColor Cyan
func azure functionapp publish $FUNCTION_APP --python

# Get function URL and key
Write-Host ""
Write-Host "[4/4] Retrieving function credentials..." -ForegroundColor Cyan
$FUNCTION_URL = az functionapp function show `
  --name $FUNCTION_APP `
  --resource-group $RESOURCE_GROUP `
  --function-name IngestSensorData `
  --query invokeUrlTemplate -o tsv

$FUNCTION_KEY = az functionapp keys list `
  --name $FUNCTION_APP `
  --resource-group $RESOURCE_GROUP `
  --query functionKeys.default -o tsv

Set-Location $originalLocation

Write-Host ""
Write-Host "✅ Function deployment complete!" -ForegroundColor Green
Write-Host ""
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "📋 Function Endpoints" -ForegroundColor Yellow
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "IngestSensorData:  $FUNCTION_URL"
Write-Host "Function Key:      $FUNCTION_KEY"
Write-Host ""
Write-Host "📝 Next Steps:" -ForegroundColor Yellow
Write-Host "  1. Update simulator\simulate_garden_sensors.py with:"
Write-Host "     FUNCTION_URL = `"$FUNCTION_URL`""
Write-Host "     FUNCTION_KEY = `"$FUNCTION_KEY`""
Write-Host ""
Write-Host "  2. Run: .\03-configure-sentinel.ps1"
Write-Host ""
Write-Host "🔍 Test your function:" -ForegroundColor Yellow
Write-Host @"
  `$body = @{
    sensor_id = "GG-TEST-001"
    timestamp = "2026-01-20T12:00:00Z"
    temperature = 72.5
    humidity = 65
    soil_moisture = 45
  } | ConvertTo-Json

  Invoke-RestMethod -Uri "$FUNCTION_URL`?code=$FUNCTION_KEY" ``
    -Method Post ``
    -Body `$body ``
    -ContentType "application/json"
"@
Write-Host ""
