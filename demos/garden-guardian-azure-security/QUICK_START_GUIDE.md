# Garden Guardian Demo - Quick Start Guide

## ✅ Status: DEMO IS WORKING!

Your Azure Functions are deployed and processing sensor data successfully!

## 🎯 Next Steps (15 minutes to complete)

### Step 1: Enable Microsoft Sentinel (3 minutes)

1. Open [Azure Portal](https://portal.azure.com)
2. Search for "Microsoft Sentinel"
3. Click "+ Create"
4. Select existing workspace: **law-garden-security**
5. Click "Add"
6. Wait for Sentinel to initialize

### Step 2: Create Sentinel Analytics Rules (5 minutes)

Once Sentinel is enabled:

1. Go to **Sentinel → Analytics → Create → Scheduled query rule**

**Rule 1: Unauthorized Device Detection**
- Name: `Unauthorized Device Detected`
- Description: `Detects devices without GG- prefix`
- Severity: `High`
- Query: (Copy from `sentinel-queries/unauthorized-device-detection.kql`)
```kql
traces
| where message contains "sensor_data_ingestion"
| extend sensor_id = extract("sensor_id\":\"([^\"]+)", 1, message)
| where sensor_id !startswith "GG-"
| project TimeGenerated, sensor_id, message
| order by TimeGenerated desc
```
- Query scheduling: Run every **5 minutes**
- Lookup data from last: **10 minutes**

**Rule 2: Temperature Anomaly**
- Name: `Temperature Anomaly Detected`
- Severity: `Medium`
- Query: (Copy from `sentinel-queries/temperature-anomaly-detection.kql`)
```kql
traces
| where message contains "temperature_anomaly"
| extend sensor_id = extract("sensor_id\":\"([^\"]+)", 1, message)
| extend temperature = extract("temperature\":([^,]+)", 1, message)
| project TimeGenerated, sensor_id, temperature, message
| order by TimeGenerated desc
```
- Query scheduling: Run every **10 minutes**

**Rule 3: Data Integrity Violation**
- Name: `Data Integrity Violation`
- Severity: `Critical`
- Query: (Copy from `sentinel-queries/data-integrity-violation.kql`)
```kql
traces
| where message contains "data_integrity_violation"
| extend sensor_id = extract("sensor_id\":\"([^\"]+)", 1, message)
| project TimeGenerated, sensor_id, message
| order by TimeGenerated desc
```
- Query scheduling: Run every **5 minutes**

### Step 3: Run Demo Scenarios (2 minutes)

**Generate baseline data:**
```powershell
cd simulator
python simulate_garden_sensors.py --mode normal --duration 60
```

**Generate attack data:**
```powershell
python simulate_garden_sensors.py --mode attack
```

**Mixed scenario (best for demos):**
```powershell
python simulate_garden_sensors.py --mode mixed --duration 120
```

### Step 4: Create Power BI Dashboard (5 minutes)

1. Download [Power BI Desktop](https://aka.ms/pbidesktopstore)
2. Open Power BI Desktop
3. Get Data → Azure → Azure Log Analytics
4. Enter Workspace ID: **486aa993-a9d4-4bbf-bf48-f2b06b01ae73**
5. Follow the guide in `POWERBI_DASHBOARD.md` to create 7 visuals

## 🎬 Demo Flow (15 minutes)

### Part 1: Normal Operations (2 min)
- Show architecture diagram
- Run normal simulation
- Display: "Everything running smoothly, 100% security score"

### Part 2: Live Attack (3 min)
- Switch to terminal
- Run: `python simulate_garden_sensors.py --mode attack`
- Watch red alerts appear in real-time

### Part 3: Sentinel Detection (3 min)
- Open Azure Portal → Sentinel → Incidents
- Show detected incidents:
  - Unauthorized Device Detected (High)
  - Temperature Anomaly (Medium)
  - Data Integrity Violation (Critical)
- Click on incident to show details

### Part 4: Power BI Dashboard (5 min)
- Open Power BI dashboard
- Show 7 visualizations:
  1. Security Score Gauge (drops during attack)
  2. Real-Time Sensor Map (red dots for attacks)
  3. Incidents Timeline (spike during attack)
  4. Attack Types Breakdown (donut chart)
  5. Top 5 Sensors (bar chart)
  6. Temperature Heatmap (anomalies highlighted)
  7. Purview Lineage (data governance)

### Part 5: Automated Response (2 min)
- Explain the AutoResponse function
- Show how it automatically:
  - Blocks unauthorized devices
  - Sends alerts to SOC team
  - Logs compliance events in Purview
  - All without human intervention!

## 📊 Key Talking Points for PG Parks

1. **Real-time Threat Detection**
   - "Within 5 minutes of an attack, Sentinel detected and alerted"
   - "No waiting for daily reports - instant visibility"

2. **Automated Response (Agentic AI)**
   - "The system blocked the hacker automatically"
   - "Security team can focus on strategy, not routine tasks"

3. **Compliance & Governance**
   - "Purview tracks every data access"
   - "Meets NIST-800-53 requirements for government systems"
   - "Audit trail for all security incidents"

4. **Cost-Effective**
   - "Serverless architecture - only pay for what you use"
   - "No expensive security hardware needed"
   - "Scales from 5 sensors to 5,000 sensors automatically"

5. **Garden-Specific Value**
   - "Prevents irrigation system tampering"
   - "Detects sensor tampering early"
   - "Protects critical infrastructure"

## 🔗 Quick Links

- **Azure Portal**: https://portal.azure.com
- **Function App**: https://func-garden-guardian.azurewebsites.net/api/health
- **Log Analytics**: https://portal.azure.com/#resource/subscriptions/d7e6c9eb-e5ca-44b8-b3a3-2c3d9b9e4169/resourceGroups/rg-garden-guardian/providers/Microsoft.OperationalInsights/workspaces/law-garden-security
- **Sentinel**: https://portal.azure.com/#blade/Microsoft_Azure_Security_Insights/WorkspaceSelectorBlade

## 🧹 Cleanup After Presentation

To avoid ongoing Azure charges:

```powershell
cd scripts
.\cleanup.ps1
```

This will delete all resources in the `rg-garden-guardian` resource group.

## 🎉 Success Metrics

✅ Azure Functions deployed and responding (3 functions)
✅ Simulator generating normal + attack traffic
✅ Data flowing to Log Analytics
✅ Power BI dashboard ready (guide created)
⏳ Sentinel needs manual enablement (3 min)
⏳ Analytics rules need creation (5 min)

**Total time to complete demo setup: ~15 minutes from now**

---

## 🆘 Troubleshooting

**Simulator shows 404 errors:**
- ✅ Fixed! Functions are now deployed via `func` CLI

**No data in Log Analytics:**
- Wait 2-3 minutes for data ingestion
- Verify function app is running: `az functionapp list --resource-group rg-garden-guardian --output table`

**Sentinel not showing incidents:**
- Ensure analytics rules are created and enabled
- Check query scheduling (run manually first to test)
- Wait for scheduled run (5-10 minutes)

**Power BI can't connect:**
- Verify Workspace ID: `486aa993-a9d4-4bbf-bf48-f2b06b01ae73`
- Ensure you're logged in with `thedopecloudteacher@gmail.com`
- Check Log Analytics has data: Portal → Logs → Run query `traces | take 10`

---

*Demo created by The Dope Cloud Teacher | thedopecloudteacher.org*
