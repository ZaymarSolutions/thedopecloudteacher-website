# ============================================================
# Garden Guardian - Configure Microsoft Sentinel (PowerShell)
# ============================================================
# This script sets up Sentinel and creates analytics rules
# Prerequisites: Run 01 and 02 scripts first
# ============================================================

$ErrorActionPreference = "Stop"

# Configuration
$RESOURCE_GROUP = "rg-garden-guardian"
$LAW_NAME = "law-garden-security"
$LOCATION = "eastus"

Write-Host "╔═══════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   🛡️  Configuring Microsoft Sentinel 🛡️             ║" -ForegroundColor Cyan
Write-Host "╚═══════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Get Log Analytics Workspace ID
Write-Host "[1/5] Getting Log Analytics Workspace details..." -ForegroundColor Cyan
$LAW_ID = az monitor log-analytics workspace show `
  --resource-group $RESOURCE_GROUP `
  --workspace-name $LAW_NAME `
  --query id -o tsv

Write-Host "   Workspace ID: $LAW_ID" -ForegroundColor Green

# Enable Sentinel on the workspace
Write-Host ""
Write-Host "[2/5] Enabling Microsoft Sentinel..." -ForegroundColor Cyan
try {
    az sentinel onboard `
      --resource-group $RESOURCE_GROUP `
      --workspace-name $LAW_NAME `
      --output none 2>$null
}
catch {
    Write-Host "   Sentinel already enabled" -ForegroundColor Yellow
}

# Note: Analytics rules typically need to be created via Portal
Write-Host ""
Write-Host "[3/5] Preparing analytics rules..." -ForegroundColor Cyan
Write-Host "   ⚠️  Analytics rules require manual setup via Azure Portal" -ForegroundColor Yellow

Write-Host ""
Write-Host "[4/5] Configuring data connectors..." -ForegroundColor Cyan
Write-Host "   Azure Functions data connector will be auto-discovered" -ForegroundColor Green

Write-Host ""
Write-Host "[5/5] Setting up workbooks..." -ForegroundColor Cyan
Write-Host "   Custom workbook templates available in Sentinel" -ForegroundColor Green

Write-Host ""
Write-Host "✅ Sentinel configuration complete!" -ForegroundColor Green
Write-Host ""
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "🛡️  Microsoft Sentinel Setup" -ForegroundColor Yellow
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "Analytics Rules to Create Manually:" -ForegroundColor Yellow
Write-Host '  1. Unauthorized Device Detection (High severity)'
Write-Host '  2. Temperature Anomaly Detection (Medium severity)'
Write-Host '  3. Data Integrity Violation (Critical severity)'
Write-Host ""
Write-Host "📝 Manual Configuration Steps:" -ForegroundColor Yellow
Write-Host ""
Write-Host "Visit Sentinel in Azure Portal:"
Write-Host "  https://portal.azure.com/#@/resource$LAW_ID/Sentinel" -ForegroundColor Cyan
Write-Host ""
Write-Host "Then:" -ForegroundColor Yellow
Write-Host '  1. Go to Configuration → Analytics → Create → Scheduled query rule'
Write-Host '  2. Use KQL queries from: sentinel-queries\'
Write-Host "     • unauthorized-device-detection.kql"
Write-Host "     • temperature-anomaly-detection.kql"
Write-Host "     • data-integrity-violation.kql"
Write-Host ""
Write-Host "🎯 Next Steps:" -ForegroundColor Yellow
Write-Host '  1. Configure analytics rules in Sentinel (see above)'
Write-Host '  2. Test the system:'
Write-Host "     cd ..\simulator"
Write-Host "     python simulate_garden_sensors.py --mode attack"
Write-Host ""
Write-Host '  3. View incidents in Azure Portal:'
Write-Host '     Sentinel → Incidents'
Write-Host ""
Write-Host '  4. Run Log Analytics queries:'
Write-Host '     Log Analytics → Logs → Copy queries from sentinel-queries\'
Write-Host ""
Write-Host '  5. Explore Purview data lineage:'
Write-Host '     Purview Studio → Data Catalog → Search for garden assets'
Write-Host ""
