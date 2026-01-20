# ============================================================
# Garden Guardian - Azure Infrastructure Setup (PowerShell)
# ============================================================
# This script creates all required Azure resources for the demo
# Estimated time: 3-5 minutes
# ============================================================

$ErrorActionPreference = "Stop"

# Configuration
$RESOURCE_GROUP = "rg-garden-guardian"
$LOCATION = "eastus"
$LAW_NAME = "law-garden-security"
$STORAGE_ACCOUNT = "stgardenguard$(Get-Date -Format 'MMddHHmmss')"
$FUNCTION_APP = "func-garden-guardian"
$APP_INSIGHTS = "garden-insights"
$PURVIEW_ACCOUNT = "purview-garden-guardian"

Write-Host "╔═══════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   🌱 Garden Guardian - Infrastructure Setup 🌱       ║" -ForegroundColor Cyan
Write-Host "╚═══════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""
Write-Host "Configuration:" -ForegroundColor Yellow
Write-Host "  Resource Group: $RESOURCE_GROUP"
Write-Host "  Location: $LOCATION"
Write-Host "  Log Analytics: $LAW_NAME"
Write-Host "  Function App: $FUNCTION_APP"
Write-Host "  Purview Account: $PURVIEW_ACCOUNT"
Write-Host ""
Write-Host "Starting deployment..." -ForegroundColor Green
Write-Host ""

# Step 1: Create Resource Group
Write-Host "[1/7] Creating resource group..." -ForegroundColor Cyan
az group create `
  --name $RESOURCE_GROUP `
  --location $LOCATION `
  --output table

# Step 2: Create Log Analytics Workspace (for Sentinel)
Write-Host ""
Write-Host "[2/7] Creating Log Analytics Workspace..." -ForegroundColor Cyan
az monitor log-analytics workspace create `
  --resource-group $RESOURCE_GROUP `
  --workspace-name $LAW_NAME `
  --location $LOCATION `
  --output table

# Get workspace ID and key for later use
$LAW_ID = az monitor log-analytics workspace show `
  --resource-group $RESOURCE_GROUP `
  --workspace-name $LAW_NAME `
  --query customerId -o tsv

$LAW_KEY = az monitor log-analytics workspace get-shared-keys `
  --resource-group $RESOURCE_GROUP `
  --workspace-name $LAW_NAME `
  --query primarySharedKey -o tsv

Write-Host "   Workspace ID: $LAW_ID" -ForegroundColor Green

# Step 3: Create Application Insights
Write-Host ""
Write-Host "[3/7] Creating Application Insights..." -ForegroundColor Cyan
az monitor app-insights component create `
  --app $APP_INSIGHTS `
  --location $LOCATION `
  --resource-group $RESOURCE_GROUP `
  --workspace $LAW_ID `
  --output table

$APP_INSIGHTS_KEY = az monitor app-insights component show `
  --app $APP_INSIGHTS `
  --resource-group $RESOURCE_GROUP `
  --query instrumentationKey -o tsv

# Step 4: Create Storage Account (required for Function App)
Write-Host ""
Write-Host "[4/7] Creating storage account..." -ForegroundColor Cyan
az storage account create `
  --name $STORAGE_ACCOUNT `
  --resource-group $RESOURCE_GROUP `
  --location $LOCATION `
  --sku Standard_LRS `
  --output table

# Step 5: Create Microsoft Purview Account
Write-Host ""
Write-Host "[5/7] Creating Microsoft Purview account..." -ForegroundColor Cyan
Write-Host "   This may take 5-10 minutes" -ForegroundColor Yellow
az purview account create `
  --resource-group $RESOURCE_GROUP `
  --name $PURVIEW_ACCOUNT `
  --location $LOCATION `
  --managed-group-name "managed-rg-$PURVIEW_ACCOUNT" `
  --output table

# Get Purview endpoint
$PURVIEW_ENDPOINT = az purview account show `
  --resource-group $RESOURCE_GROUP `
  --name $PURVIEW_ACCOUNT `
  --query 'endpoints.catalog' -o tsv

Write-Host "   Purview Endpoint: $PURVIEW_ENDPOINT" -ForegroundColor Green

# Step 6: Create Function App (Python 3.10)
Write-Host ""
Write-Host "[6/7] Creating Azure Function App..." -ForegroundColor Cyan
az functionapp create `
  --resource-group $RESOURCE_GROUP `
  --name $FUNCTION_APP `
  --storage-account $STORAGE_ACCOUNT `
  --consumption-plan-location $LOCATION `
  --runtime python `
  --runtime-version 3.10 `
  --functions-version 4 `
  --os-type Linux `
  --output table

# Step 7: Configure Function App settings
Write-Host ""
Write-Host "[7/7] Configuring Function App..." -ForegroundColor Cyan
az functionapp config appsettings set `
  --name $FUNCTION_APP `
  --resource-group $RESOURCE_GROUP `
  --settings `
    "APPINSIGHTS_INSTRUMENTATIONKEY=$APP_INSIGHTS_KEY" `
    "APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=$APP_INSIGHTS_KEY" `
    "LOG_ANALYTICS_WORKSPACE_ID=$LAW_ID" `
    "LOG_ANALYTICS_WORKSPACE_KEY=$LAW_KEY" `
    "PURVIEW_ACCOUNT_NAME=$PURVIEW_ACCOUNT" `
    "PURVIEW_ENDPOINT=$PURVIEW_ENDPOINT" `
  --output none

Write-Host ""
Write-Host "✅ Infrastructure setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "📋 Resource Summary" -ForegroundColor Yellow
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "Resource Group:     $RESOURCE_GROUP"
Write-Host "Function App:       $FUNCTION_APP"
Write-Host "Log Analytics:      $LAW_NAME"
Write-Host "App Insights:       $APP_INSIGHTS"
Write-Host "Storage Account:    $STORAGE_ACCOUNT"
Write-Host "Purview Account:    $PURVIEW_ACCOUNT"
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "  1. Run: .\02-deploy-function.ps1"
Write-Host "  2. Run: .\03-configure-sentinel.ps1"
Write-Host "  3. Update simulator\simulate_garden_sensors.py with Function URL and key"
Write-Host ""
Write-Host "Access your resources:" -ForegroundColor Yellow
$subscriptionId = az account show --query id -o tsv
Write-Host "  Portal: https://portal.azure.com/#@/resource/subscriptions/$subscriptionId/resourceGroups/$RESOURCE_GROUP"
Write-Host "  Purview Studio: https://web.purview.azure.com/resource/$PURVIEW_ACCOUNT" -ForegroundColor Cyan
Write-Host ""
