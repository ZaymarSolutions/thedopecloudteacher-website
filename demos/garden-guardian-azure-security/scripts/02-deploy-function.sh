#!/bin/bash
# ============================================================
# Garden Guardian - Deploy Azure Function
# ============================================================
# This script deploys the function code to Azure
# Prerequisites: Run 01-setup-infrastructure.sh first
# ============================================================

set -e

# Configuration
RESOURCE_GROUP="rg-garden-guardian"
FUNCTION_APP="func-garden-guardian"

echo "╔═══════════════════════════════════════════════════════╗"
echo "║   🚀 Deploying Garden Guardian Function 🚀           ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo ""

# Check if function app exists
echo "[1/4] Verifying Function App exists..."
if ! az functionapp show --name $FUNCTION_APP --resource-group $RESOURCE_GROUP &> /dev/null; then
    echo "❌ Error: Function App not found"
    echo "   Please run 01-setup-infrastructure.sh first"
    exit 1
fi
echo "   ✓ Function App found"

# Navigate to function directory
echo ""
echo "[2/4] Preparing function code..."
cd ../azure-function

# Check if required files exist
if [ ! -f "function_app.py" ]; then
    echo "❌ Error: function_app.py not found"
    exit 1
fi
if [ ! -f "requirements.txt" ]; then
    echo "❌ Error: requirements.txt not found"
    exit 1
fi
echo "   ✓ Function code validated"

# Deploy to Azure
echo ""
echo "[3/4] Deploying to Azure (this may take 2-3 minutes)..."
func azure functionapp publish $FUNCTION_APP --python

# Get function URL and key
echo ""
echo "[4/4] Retrieving function credentials..."
FUNCTION_URL=$(az functionapp function show \
  --name $FUNCTION_APP \
  --resource-group $RESOURCE_GROUP \
  --function-name IngestSensorData \
  --query invokeUrlTemplate -o tsv)

FUNCTION_KEY=$(az functionapp keys list \
  --name $FUNCTION_APP \
  --resource-group $RESOURCE_GROUP \
  --query functionKeys.default -o tsv)

echo ""
echo "✅ Function deployment complete!"
echo ""
echo "═══════════════════════════════════════════════════════"
echo "📋 Function Endpoints"
echo "═══════════════════════════════════════════════════════"
echo "IngestSensorData:  $FUNCTION_URL"
echo "Function Key:      $FUNCTION_KEY"
echo ""
echo "📝 Next Steps:"
echo "  1. Update simulator/simulate_garden_sensors.py with:"
echo "     FUNCTION_URL = \"$FUNCTION_URL\""
echo "     FUNCTION_KEY = \"$FUNCTION_KEY\""
echo ""
echo "  2. Run: ./03-configure-sentinel.sh"
echo ""
echo "🔍 Test your function:"
echo "  curl -X POST \"$FUNCTION_URL?code=$FUNCTION_KEY\" \\"
echo "    -H \"Content-Type: application/json\" \\"
echo "    -d '{\"sensor_id\":\"GG-TEST-001\",\"timestamp\":\"2024-01-15T12:00:00Z\",\"temperature\":72.5,\"humidity\":65,\"soil_moisture\":45}'"
echo ""
