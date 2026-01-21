# 📊 Garden Guardian - Power BI Dashboard Guide

**Create a stunning real-time security dashboard for your PG Parks demo!**

---

## 🚀 Quick Setup (5 Minutes)

### Step 1: Install Power BI Desktop
Download from: https://aka.ms/pbidesktopstore

### Step 2: Connect to Azure Log Analytics

1. Open Power BI Desktop
2. Click **Get Data** → **More...**
3. Search for "**Azure Log Analytics**"
4. Click **Connect**

**Enter your workspace details:**
```
Workspace ID: (Get from Azure Portal)
```

To get Workspace ID:
```powershell
az monitor log-analytics workspace show --resource-group "rg-garden-guardian" --workspace-name "law-garden-security" --query customerId -o tsv
```

---

## 📈 Dashboard Visuals to Create

### Visual 1: **Real-Time Sensor Activity Map**
**Type:** Map or Scatter Chart  
**KQL Query:**
```kql
FunctionAppLogs
| where TimeGenerated > ago(1h)
| where FunctionName == "IngestSensorData"
| extend SensorId = tostring(parse_json(Message).sensor_id)
| extend Temperature = toreal(parse_json(Message).temperature)
| extend AnomalyDetected = tobool(parse_json(Message).anomaly_detected)
| summarize 
    AvgTemp = avg(Temperature),
    TotalRequests = count(),
    Anomalies = countif(AnomalyDetected == true)
    by SensorId
| extend Status = iff(Anomalies > 0, "⚠️ Alert", "✅ Normal")
```

**Visual Settings:**
- X-axis: SensorId
- Y-axis: AvgTemp
- Size: TotalRequests
- Color: Status (Red for Alert, Green for Normal)

---

### Visual 2: **Security Incidents Timeline**
**Type:** Line Chart  
**KQL Query:**
```kql
FunctionAppLogs
| where TimeGenerated > ago(24h)
| where Message contains "anomaly_detected"
| extend 
    Timestamp = TimeGenerated,
    Severity = tostring(parse_json(Message).severity)
| summarize Count = count() by bin(Timestamp, 10m), Severity
| order by Timestamp asc
```

**Visual Settings:**
- X-axis: Timestamp
- Y-axis: Count
- Legend: Severity
- Colors: 
  - Critical = Red
  - High = Orange
  - Medium = Yellow
  - Informational = Green

---

### Visual 3: **Attack Types Breakdown**
**Type:** Donut Chart  
**KQL Query:**
```kql
FunctionAppLogs
| where TimeGenerated > ago(24h)
| where Message contains "anomaly_detected"
| extend AnomalyType = tostring(parse_json(Message).anomaly_type)
| summarize Count = count() by AnomalyType
| order by Count desc
```

**Labels:**
- unauthorized_device: "🚫 Unauthorized Devices"
- temperature_anomaly: "🌡️ Temperature Anomalies"
- data_integrity_violation: "🔐 Data Tampering"

---

### Visual 4: **Security Score Gauge**
**Type:** Gauge  
**KQL Query:**
```kql
FunctionAppLogs
| where TimeGenerated > ago(1h)
| where FunctionName == "IngestSensorData"
| extend AnomalyDetected = tobool(parse_json(Message).anomaly_detected)
| summarize 
    Total = count(),
    Normal = countif(AnomalyDetected == false)
| extend SecurityScore = round((todouble(Normal) / todouble(Total)) * 100, 2)
| project SecurityScore
```

**Gauge Settings:**
- Minimum: 0
- Maximum: 100
- Target: 95 (Green zone)
- Color Zones:
  - 0-70: Red
  - 70-90: Yellow
  - 90-100: Green

---

### Visual 5: **Top 5 Sensors by Activity**
**Type:** Bar Chart (Horizontal)  
**KQL Query:**
```kql
FunctionAppLogs
| where TimeGenerated > ago(1h)
| where FunctionName == "IngestSensorData"
| extend SensorId = tostring(parse_json(Message).sensor_id)
| summarize RequestCount = count() by SensorId
| top 5 by RequestCount desc
```

---

### Visual 6: **Temperature Heatmap**
**Type:** Matrix or Heatmap  
**KQL Query:**
```kql
FunctionAppLogs
| where TimeGenerated > ago(1h)
| extend 
    SensorId = tostring(parse_json(Message).sensor_id),
    Temperature = toreal(parse_json(Message).temperature)
| summarize AvgTemp = avg(Temperature) by SensorId, bin(TimeGenerated, 5m)
| order by TimeGenerated asc
```

**Conditional Formatting:**
- < 60°F: Blue
- 60-85°F: Green
- 85-100°F: Yellow
- > 100°F: Red

---

### Visual 7: **Purview Data Lineage** (Optional - If Purview configured)
**Type:** Sankey Diagram  
**KQL Query:**
```kql
FunctionAppLogs
| where TimeGenerated > ago(1h)
| where Message contains "PURVIEW_LINEAGE"
| extend LineageData = parse_json(substring(Message, indexof(Message, "PURVIEW_LINEAGE: ") + 17))
| project 
    Source = tostring(LineageData.source),
    Destination = tostring(LineageData.destination),
    Count = 1
| summarize Count = sum(Count) by Source, Destination
```

---

## 🎨 Dashboard Layout Recommendation

```
┌─────────────────────────────────────────────────────┐
│  🌱 Garden Guardian Security Dashboard              │
│  Last Updated: [Auto-refresh every 30 seconds]      │
├───────────────────┬─────────────────────────────────┤
│  Security Score   │  Real-Time Sensor Activity Map  │
│  [Gauge]          │  [Scatter Chart]                │
│  🟢 98%           │  • GG-TOMATO-001 ✅             │
│                   │  • GG-CUCUMBER-002 ✅           │
│                   │  • HACKER-999 ⚠️                │
├───────────────────┴─────────────────────────────────┤
│  Security Incidents Timeline (Last 24 Hours)        │
│  [Line Chart]                                       │
│  🔴 Critical ──  🟠 High ──  🟡 Medium ──  🟢 Info │
├──────────────────────────┬──────────────────────────┤
│  Attack Types Breakdown  │  Top 5 Active Sensors    │
│  [Donut Chart]           │  [Bar Chart]             │
│  🚫 Unauthorized: 45%    │  GG-TOMATO-001 ████████  │
│  🌡️ Temp Anomaly: 30%   │  GG-CUCUMBER-002 ██████  │
│  🔐 Data Tamper: 25%     │  GG-PEPPER-003 ████      │
├──────────────────────────┴──────────────────────────┤
│  Temperature Heatmap (Last Hour)                    │
│  [Matrix/Heatmap]                                   │
│  Sensor         10:00  10:15  10:30  10:45          │
│  GG-TOMATO-001   72°   74°    🔥120°  73°          │
│  GG-CUCUMBER-002 68°   69°    70°    68°           │
└─────────────────────────────────────────────────────┘
```

---

## 🔄 Enable Auto-Refresh

1. Click **File** → **Options and settings** → **Options**
2. Under **Current File**, select **Data Load**
3. Enable **Allow data preview to download in the background**
4. Set refresh interval: **30 seconds** (for demos)

**For presentations:** Right before your demo, click **Refresh** to ensure latest data.

---

## 🎥 Demo Flow with Power BI

### Preparation (Before PG Parks Arrives):
1. Open Power BI dashboard
2. Run normal sensor simulation to show baseline
3. Leave dashboard open with auto-refresh

### During Demo:
**[SLIDE 1: Baseline Operations]**
> "This is what normal looks like - all green, security score at 98%"

**[Run Attack Simulation in Terminal]**
```powershell
python simulate_garden_sensors.py --mode attack
```

**[SLIDE 2: Watch Dashboard Update]**
> "In real-time, you can see:
> - Security score drops (gauge turns red)
> - New dots appear on the map (unauthorized devices)
> - Incidents timeline spikes upward
> - Attack types donut updates
> - Temperature heatmap shows anomalies"

**[SLIDE 3: Drill into Details]**
Click on a sensor in the map → Show detailed logs

> "This is what the SOC team would investigate - complete audit trail automatically logged"

---

## 💡 Advanced Features (Optional)

### Add Alerts in Power BI Service
1. Publish dashboard to Power BI Service
2. Set alert: "If Security Score < 90%, send email to thedopecloudteacher@gmail.com"
3. Configure **Microsoft Teams** notifications for critical incidents

### Mobile App
- Download Power BI Mobile app
- View dashboard on phone during demo
- Show "you can monitor county infrastructure from anywhere"

### Q&A Natural Language
Enable Q&A visual:
- "Show me all unauthorized devices in the last hour"
- "What's the average temperature?"
- "How many security incidents today?"

---

## 🎯 Key Talking Points for PG Parks

**When showing Power BI dashboard:**

> "What you're seeing here is a **real-time security operations center** - the same tools Fortune 500 companies use to protect their infrastructure. But notice:
> 
> - **No expensive analysts needed** - the system watches 24/7
> - **Instant visibility** - County leadership can see this from any device
> - **Automated compliance** - Every incident documented for auditors
> - **Cost-effective** - Azure charges about $50/month for this level of monitoring
> 
> When we scale this from 5 garden sensors to 500 county IoT devices - traffic lights, water sensors, building systems - the dashboard looks exactly the same. That's the power of cloud scale."

---

## 📁 Save Your Dashboard

**Save locations:**
- Local: `garden-guardian-security-dashboard.pbix`
- Cloud: Publish to Power BI Service (requires Pro license)
- PDF Export: File → Export → PDF (for offline presentations)

---

## 🆘 Troubleshooting

**"No data appearing in Power BI"**
- Check Log Analytics has data: Run KQL query in Azure Portal first
- Verify Workspace ID is correct
- Allow 2-3 minutes for data to flow after first Function execution

**"Connection failed"**
- You may need Azure AD authentication
- Ensure your account (thedopecloudteacher@gmail.com) has Log Analytics Reader role

**"Visuals not updating"**
- Check auto-refresh is enabled
- Manually click **Refresh** button
- Verify Function is receiving requests (check Azure Portal)

---

## 🎓 Power BI Learning Resources

- **Power BI Desktop Download:** https://aka.ms/pbidesktopstore
- **Azure Log Analytics Connector:** https://learn.microsoft.com/power-bi/connect-data/desktop-connect-azure-monitor-logs
- **Dashboard Design Guide:** https://learn.microsoft.com/power-bi/create-reports/service-dashboards-design-tips

---

## 💰 Cost Considerations

**Power BI Desktop:** FREE
**Power BI Pro:** $10/user/month (needed for sharing/Teams integration)
**Power BI Premium:** $20/user/month (for advanced features)

**Recommendation for PG Parks:**
- Start with Desktop (free) for demos
- Upgrade to Pro if county leadership wants ongoing access
- Embedded analytics can show in custom web portals (included in Azure costs)

---

**Built with 💜 by The Dope Cloud Teacher**  
*thedopecloudteacher@gmail.com*

---

## 📸 Screenshot Checklist for Demo

Before your PG Parks presentation, capture these Power BI screenshots as backup:

- [ ] Dashboard with 100% security score (baseline)
- [ ] Dashboard showing active attacks (security score drops)
- [ ] Attack types breakdown donut chart
- [ ] Temperature heatmap with anomaly highlighted
- [ ] Incidents timeline with spike
- [ ] Sensor activity map with unauthorized device marked in red

**Pro Tip:** Have these screenshots in a PowerPoint deck as backup in case of connectivity issues during live demo!
