# ============================================================
# Garden Guardian - Cleanup Resources (PowerShell)
# ============================================================
# This script deletes all Azure resources created for the demo
# WARNING: This action cannot be undone!
# ============================================================

$ErrorActionPreference = "Stop"

$RESOURCE_GROUP = "rg-garden-guardian"

Write-Host "╔═══════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   🧹 Garden Guardian - Resource Cleanup 🧹           ║" -ForegroundColor Cyan
Write-Host "╚═══════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""
Write-Host "⚠️  WARNING: This will DELETE all resources in:" -ForegroundColor Red
Write-Host "   Resource Group: $RESOURCE_GROUP" -ForegroundColor Yellow
Write-Host ""
Write-Host "This includes:" -ForegroundColor Yellow
Write-Host "  - Function App and all code"
Write-Host "  - Log Analytics Workspace (all logs will be lost)"
Write-Host "  - Microsoft Sentinel configuration"
Write-Host "  - Application Insights data"
Write-Host "  - Storage Account"
Write-Host "  - Microsoft Purview account (all data lineage will be lost)"
Write-Host ""

$CONFIRM = Read-Host "Are you sure you want to continue? (type 'yes' to confirm)"

if ($CONFIRM -ne "yes") {
    Write-Host ""
    Write-Host "❌ Cleanup cancelled" -ForegroundColor Red
    exit 0
}

Write-Host ""
Write-Host "Deleting resource group..." -ForegroundColor Yellow
Write-Host "(This may take 2-3 minutes)" -ForegroundColor Yellow
Write-Host ""

az group delete `
  --name $RESOURCE_GROUP `
  --yes `
  --no-wait

Write-Host "✅ Cleanup initiated" -ForegroundColor Green
Write-Host ""
Write-Host "The resource group is being deleted in the background."
Write-Host "You can monitor progress in the Azure Portal:"
Write-Host "  https://portal.azure.com/#view/HubsExtension/BrowseResourceGroups" -ForegroundColor Cyan
Write-Host ""
Write-Host "💰 Cost Impact:" -ForegroundColor Yellow
Write-Host "  All Azure charges will stop once deletion completes."
Write-Host ""
