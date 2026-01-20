#!/bin/bash
# ============================================================
# Garden Guardian - Cleanup Resources
# ============================================================
# This script deletes all Azure resources created for the demo
# WARNING: This action cannot be undone!
# ============================================================

set -e

RESOURCE_GROUP="rg-garden-guardian"

echo "╔═══════════════════════════════════════════════════════╗"
echo "║   🧹 Garden Guardian - Resource Cleanup 🧹           ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo ""
echo "⚠️  WARNING: This will DELETE all resources in:"
echo "   Resource Group: $RESOURCE_GROUP"
echo ""
echo "This includes:"
echo "  - Function App and all code"
echo "  - Log Analytics Workspace (all logs will be lost)"
echo "  - Microsoft Sentinel configuration"
echo "  - Application Insights data"
echo "  - Storage Account"
echo ""
read -p "Are you sure you want to continue? (type 'yes' to confirm): " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
    echo ""
    echo "❌ Cleanup cancelled"
    exit 0
fi

echo ""
echo "Deleting resource group..."
echo "(This may take 2-3 minutes)"
echo ""

az group delete \
  --name $RESOURCE_GROUP \
  --yes \
  --no-wait

echo "✅ Cleanup initiated"
echo ""
echo "The resource group is being deleted in the background."
echo "You can monitor progress in the Azure Portal:"
echo "  https://portal.azure.com/#view/HubsExtension/BrowseResourceGroups"
echo ""
echo "💰 Cost Impact:"
echo "  All Azure charges will stop once deletion completes."
echo ""
