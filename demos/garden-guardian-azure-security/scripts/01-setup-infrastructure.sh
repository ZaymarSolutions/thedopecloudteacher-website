#!/bin/bash
# ============================================================
# Garden Guardian - Azure Infrastructure Setup
# ============================================================
# This script creates all required Azure resources for the demo
# Estimated time: 3-5 minutes
# ============================================================

set -e  # Exit on any error

# Configuration
RESOURCE_GROUP="rg-garden-guardian"
LOCATION="eastus"
LAW_NAME="law-garden-security"
STORAGE_ACCOUNT="stgardenguard$(date +%s)"  # Add timestamp for uniqueness
FUNCTION_APP="func-garden-guardian"
APP_INSIGHTS="garden-insights"

echo "╔═══════════════════════════════════════════════════════╗"
echo "║   🌱 Garden Guardian - Infrastructure Setup 🌱       ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo ""
echo "Configuration:"
echo "  Resource Group: $RESOURCE_GROUP"
echo "  Location: $LOCATION"
echo "  Log Analytics: $LAW_NAME"
echo "  Function App: $FUNCTION_APP"
echo ""
echo "Starting deployment..."
echo ""

# Step 1: Create Resource Group
echo "[1/6] Creating resource group..."
az group create \
  --name $RESOURCE_GROUP \
  --location $LOCATION \
  --output table

# Step 2: Create Log Analytics Workspace (for Sentinel)
echo ""
echo "[2/6] Creating Log Analytics Workspace..."
az monitor log-analytics workspace create \
  --resource-group $RESOURCE_GROUP \
  --workspace-name $LAW_NAME \
  --location $LOCATION \
  --output table

# Get workspace ID and key for later use
LAW_ID=$(az monitor log-analytics workspace show \
  --resource-group $RESOURCE_GROUP \
  --workspace-name $LAW_NAME \
  --query customerId -o tsv)

LAW_KEY=$(az monitor log-analytics workspace get-shared-keys \
  --resource-group $RESOURCE_GROUP \
  --workspace-name $LAW_NAME \
  --query primarySharedKey -o tsv)

echo "   Workspace ID: $LAW_ID"

# Step 3: Create Application Insights
echo ""
echo "[3/6] Creating Application Insights..."
az monitor app-insights component create \
  --app $APP_INSIGHTS \
  --location $LOCATION \
  --resource-group $RESOURCE_GROUP \
  --workspace $LAW_ID \
  --output table

APP_INSIGHTS_KEY=$(az monitor app-insights component show \
  --app $APP_INSIGHTS \
  --resource-group $RESOURCE_GROUP \
  --query instrumentationKey -o tsv)

# Step 4: Create Storage Account (required for Function App)
echo ""
echo "[4/6] Creating storage account..."
az storage account create \
  --name $STORAGE_ACCOUNT \
  --resource-group $RESOURCE_GROUP \
  --location $LOCATION \
  --sku Standard_LRS \
  --output table

# Step 5: Create Function App (Python 3.10)
echo ""
echo "[5/6] Creating Azure Function App..."
az functionapp create \
  --resource-group $RESOURCE_GROUP \
  --name $FUNCTION_APP \
  --storage-account $STORAGE_ACCOUNT \
  --consumption-plan-location $LOCATION \
  --runtime python \
  --runtime-version 3.10 \
  --functions-version 4 \
  --os-type Linux \
  --output table

# Configure Function App settings
echo ""
echo "[6/6] Configuring Function App..."
az functionapp config appsettings set \
  --name $FUNCTION_APP \
  --resource-group $RESOURCE_GROUP \
  --settings \
    "APPINSIGHTS_INSTRUMENTATIONKEY=$APP_INSIGHTS_KEY" \
    "APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=$APP_INSIGHTS_KEY" \
    "LOG_ANALYTICS_WORKSPACE_ID=$LAW_ID" \
    "LOG_ANALYTICS_WORKSPACE_KEY=$LAW_KEY" \
  --output none

echo ""
echo "✅ Infrastructure setup complete!"
echo ""
echo "═══════════════════════════════════════════════════════"
echo "📋 Resource Summary"
echo "═══════════════════════════════════════════════════════"
echo "Resource Group:     $RESOURCE_GROUP"
echo "Function App:       $FUNCTION_APP"
echo "Log Analytics:      $LAW_NAME"
echo "App Insights:       $APP_INSIGHTS"
echo "Storage Account:    $STORAGE_ACCOUNT"
echo ""
echo "📝 Next Steps:"
echo "  1. Run: ./02-deploy-function.sh"
echo "  2. Run: ./03-configure-sentinel.sh"
echo "  3. Update simulator/simulate_garden_sensors.py with Function URL and key"
echo ""
echo "🌐 Access your resources:"
echo "  Portal: https://portal.azure.com/#@/resource/subscriptions/$(az account show --query id -o tsv)/resourceGroups/$RESOURCE_GROUP"
echo ""
