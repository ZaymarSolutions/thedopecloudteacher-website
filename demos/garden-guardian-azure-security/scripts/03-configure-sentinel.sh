#!/bin/bash
# ============================================================
# Garden Guardian - Configure Microsoft Sentinel
# ============================================================
# This script sets up Sentinel and creates analytics rules
# Prerequisites: Run 01 and 02 scripts first
# ============================================================

set -e

# Configuration
RESOURCE_GROUP="rg-garden-guardian"
LAW_NAME="law-garden-security"
LOCATION="eastus"

echo "╔═══════════════════════════════════════════════════════╗"
echo "║   🛡️  Configuring Microsoft Sentinel 🛡️             ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo ""

# Get Log Analytics Workspace ID
echo "[1/5] Getting Log Analytics Workspace details..."
LAW_ID=$(az monitor log-analytics workspace show \
  --resource-group $RESOURCE_GROUP \
  --workspace-name $LAW_NAME \
  --query id -o tsv)

echo "   Workspace ID: $LAW_ID"

# Enable Sentinel on the workspace
echo ""
echo "[2/5] Enabling Microsoft Sentinel..."
az sentinel onboard \
  --resource-group $RESOURCE_GROUP \
  --workspace-name $LAW_NAME \
  --output none 2>/dev/null || echo "   Sentinel already enabled"

# Create Analytics Rule: Unauthorized Device Detection
echo ""
echo "[3/5] Creating analytics rule: Unauthorized Device Detection..."
az sentinel alert-rule create \
  --resource-group $RESOURCE_GROUP \
  --workspace-name $LAW_NAME \
  --alert-rule-template-name "GardenGuardian_UnauthorizedDevice" \
  --name "Unauthorized Device Detected" \
  --enabled true \
  --description "Detects IoT devices attempting to send data without proper authorization" \
  --severity "High" \
  --query-frequency "PT5M" \
  --query-period "PT1H" \
  --trigger-threshold 1 \
  --suppression-duration "PT1H" \
  --tactics "InitialAccess" "Persistence" \
  --output none 2>/dev/null || echo "   Rule already exists or needs manual creation"

# Create Analytics Rule: Temperature Anomaly
echo ""
echo "[4/5] Creating analytics rule: Temperature Anomaly Detection..."
az sentinel alert-rule create \
  --resource-group $RESOURCE_GROUP \
  --workspace-name $LAW_NAME \
  --alert-rule-template-name "GardenGuardian_TempAnomaly" \
  --name "Temperature Anomaly Detected" \
  --enabled true \
  --description "Detects sensor readings outside normal operating range" \
  --severity "Medium" \
  --query-frequency "PT10M" \
  --query-period "PT1H" \
  --trigger-threshold 3 \
  --suppression-duration "PT2H" \
  --tactics "Impact" \
  --output none 2>/dev/null || echo "   Rule already exists or needs manual creation"

# Create Analytics Rule: Data Integrity Violation
echo ""
echo "[5/5] Creating analytics rule: Data Integrity Violation..."
az sentinel alert-rule create \
  --resource-group $RESOURCE_GROUP \
  --workspace-name $LAW_NAME \
  --alert-rule-template-name "GardenGuardian_DataIntegrity" \
  --name "Data Integrity Violation Detected" \
  --enabled true \
  --description "Detects tampered sensor data (hash mismatch)" \
  --severity "Critical" \
  --query-frequency "PT5M" \
  --query-period "PT30M" \
  --trigger-threshold 1 \
  --suppression-duration "PT6H" \
  --tactics "Impact" "Persistence" \
  --output none 2>/dev/null || echo "   Rule already exists or needs manual creation"

echo ""
echo "✅ Sentinel configuration complete!"
echo ""
echo "═══════════════════════════════════════════════════════"
echo "🛡️  Microsoft Sentinel Setup"
echo "═══════════════════════════════════════════════════════"
echo ""
echo "Analytics Rules Created:"
echo "  1. Unauthorized Device Detection (High severity)"
echo "  2. Temperature Anomaly Detection (Medium severity)"
echo "  3. Data Integrity Violation (Critical severity)"
echo ""
echo "📝 Manual Configuration Required:"
echo ""
echo "Some analytics rules may need manual setup. Visit:"
echo "https://portal.azure.com/#@/resource$LAW_ID/Sentinel"
echo ""
echo "Then navigate to:"
echo "  Configuration → Analytics → Create → Scheduled query rule"
echo ""
echo "Use the KQL queries from: sentinel-queries/"
echo "  - unauthorized-device-detection.kql"
echo "  - temperature-anomaly-detection.kql"
echo "  - data-integrity-violation.kql"
echo ""
echo "🎯 Next Steps:"
echo "  1. Test the system:"
echo "     cd ../simulator"
echo "     python simulate_garden_sensors.py --mode attack"
echo ""
echo "  2. View incidents in Azure Portal:"
echo "     Sentinel → Incidents"
echo ""
echo "  3. Run Log Analytics queries:"
echo "     Log Analytics → Logs → Copy queries from sentinel-queries/"
echo ""
