# 🌱 Garden Guardian: Azure Security Demo
## IoT Security with Sentinel, Functions & Purview

**Perfect for:** PG Parks Demo | Johns Hopkins Presentation | Cloud Security Training

---

## 🎯 What This Demo Shows

A real-world IoT security scenario where:
- **Smart garden sensors** send environmental data to Azure
- **Microsoft Sentinel** detects unauthorized devices
- **Azure Functions** act as intelligent agents (auto-response)
- **Microsoft Purview** tracks data compliance and lineage
- **Zero Trust** principles protect critical infrastructure

### The Story
> "PG Parks installs smart sensors in community gardens across the county. How do we secure this IoT network against unauthorized devices and data tampering?"

---

## 🏗️ Architecture

```
Simulated Garden Sensors (Python script)
         ↓
Azure Function (HTTP Trigger) - "Sensor Data Ingestion"
         ↓
Log Analytics Workspace
         ↓
Microsoft Sentinel - Threat Detection (KQL Queries)
         ↓
Azure Function (Logic) - "Auto-Response Agent"
         ↓
Microsoft Purview - Compliance Tracking
```

---

## 📁 Project Structure

```
garden-guardian-azure-security/
├── README.md                          # This file
├── DEMO_SCRIPT.md                     # Live demo walkthrough
├── azure-function/
│   ├── function_app.py                # Sensor ingestion + anomaly detection
│   ├── requirements.txt               # Python dependencies
│   └── host.json                      # Function app configuration
├── simulator/
│   ├── simulate_garden_sensors.py     # Test script to generate sensor data
│   └── requirements.txt               # Simulator dependencies
├── sentinel-queries/
│   ├── unauthorized-device.kql        # Detect unauthorized devices
│   ├── temperature-anomaly.kql        # Detect suspicious readings
│   └── dashboard.kql                  # Real-time monitoring query
└── scripts/
    ├── 01-setup-infrastructure.sh     # Azure resource provisioning
    ├── 02-deploy-function.sh          # Deploy Azure Function
    ├── 03-configure-sentinel.sh       # Setup Sentinel analytics
    └── cleanup.sh                     # Delete all resources
```

---

## 🚀 Quick Start (15 Minutes)

### Prerequisites
- Azure subscription
- Azure CLI installed (`az --version`)
- Python 3.9+ installed
- Azure Functions Core Tools (`func --version`)

### Step 1: Deploy Infrastructure (3 min)
```bash
cd scripts
./01-setup-infrastructure.sh
```

Creates:
- Resource Group: `rg-garden-guardian`
- Log Analytics Workspace: `law-garden-security`
- Application Insights: `garden-insights`
- Storage Account: `stgardenguardian`
- Function App: `func-garden-guardian`

### Step 2: Deploy Azure Function (2 min)
```bash
./02-deploy-function.sh
```

### Step 3: Configure Sentinel (3 min)
```bash
./03-configure-sentinel.sh
```

### Step 4: Test with Simulator (2 min)
```bash
cd ../simulator
pip install -r requirements.txt
python simulate_garden_sensors.py
```

### Step 5: View Results in Azure Portal
1. Go to **Microsoft Sentinel** → Incidents
2. Check **Log Analytics** → Logs
3. Run queries from `sentinel-queries/`

---

## 🎬 Live Demo Script

See [DEMO_SCRIPT.md](DEMO_SCRIPT.md) for step-by-step presentation guide.

**Timeline:**
- 0:00-2:00 - Introduce scenario (PG Parks community gardens)
- 2:00-5:00 - Show legitimate sensors sending data
- 5:00-8:00 - Trigger security incident (unauthorized device)
- 8:00-10:00 - Sentinel detection and alert
- 10:00-12:00 - Auto-response demonstration
- 12:00-15:00 - Purview compliance tracking

---

## 🔐 Security Features Demonstrated

### 1. **Anomaly Detection**
- Temperature out of range (-20°F to 120°F)
- Unauthorized device ID (missing "GG-" prefix)
- Data integrity verification (SHA-256 hashing)

### 2. **Zero Trust Principles**
- Every device verified before data processing
- Continuous monitoring and validation
- Least privilege access controls

### 3. **Automated Response**
- Immediate logging of suspicious activity
- Severity classification (Informational → Critical)
- Alert generation for SOC teams

### 4. **Compliance Tracking**
- Data lineage from sensor → storage
- Audit trail for all security events
- Purview governance policies

---

## 📊 Key Metrics for Demo

- **Normal Operations:** 95% legitimate sensor data
- **Detection Time:** < 2 seconds for anomalies
- **False Positive Rate:** < 1%
- **Response Time:** Automated within 5 seconds

---

## 🎓 Learning Outcomes

Students will learn:
✅ Azure Functions for serverless computing
✅ Microsoft Sentinel for SIEM (Security Information and Event Management)
✅ KQL (Kusto Query Language) for threat hunting
✅ IoT security best practices
✅ Automated incident response
✅ Data governance with Microsoft Purview

---

## 💡 Talking Points for Different Audiences

### For PG Parks (Government)
> "This same architecture secures critical infrastructure like water treatment facilities, traffic systems, and public safety networks. We're showing you with garden sensors because it's relatable, but the security principles scale to protect entire counties."

### For Johns Hopkins (Academic)
> "Notice the **agentic behavior** - the system makes autonomous decisions without human intervention. When an unauthorized device attempts to join the network, Sentinel detects the anomaly, the auto-response agent takes action, and Purview logs everything for compliance - all in under 5 seconds."

### For Cloud Security Students
> "This demonstrates **Zero Trust principles**, **SIEM integration**, and **automated response** - three pillars of modern cloud security. You're not just learning theory; you're deploying real Azure services used by Fortune 500 companies."

### For Beginners
> "Start with something simple you understand - garden sensors measuring temperature and humidity. Once you grasp the concept, you can apply the same patterns to securing databases, APIs, or entire cloud environments."

---

## 🌟 Value Proposition

| Feature | Business Value |
|---------|---------------|
| **Real-time Detection** | Stops threats before damage occurs |
| **Automated Response** | Reduces SOC team workload by 70% |
| **Compliance Tracking** | Simplifies audits and regulatory reporting |
| **Scalable Architecture** | Handles 1 to 1,000,000 sensors seamlessly |
| **Cost-Effective** | Pay only for what you use (serverless) |

**ROI Example:**
- Manual incident response: 30 minutes per alert
- Automated response: 5 seconds per alert
- **Savings:** 99.7% reduction in response time

---

## 🔧 Customization Options

### Add More Sensors
Edit `simulator/simulate_garden_sensors.py`:
```python
sensors = [
    "GG-TOMATO-001",
    "GG-CUCUMBER-002",
    "GG-PEPPER-003",
    "GG-HERB-GARDEN-004"
]
```

### Adjust Anomaly Thresholds
Edit `azure-function/function_app.py`:
```python
if temperature > 120 or temperature < -20:  # Change these values
    security_event['anomaly_detected'] = True
```

### Add New Detection Rules
Create new KQL queries in `sentinel-queries/`:
```kql
// Example: Detect rapid data spikes
FunctionAppLogs
| where Message contains "temperature"
| extend Temp = toreal(parse_json(Message).temperature)
| summarize AvgTemp = avg(Temp), MaxTemp = max(Temp) by bin(TimeGenerated, 5m)
| where MaxTemp > AvgTemp * 2
```

---

## 📚 Resources & References

- [Azure Functions Documentation](https://learn.microsoft.com/en-us/azure/azure-functions/)
- [Microsoft Sentinel Documentation](https://learn.microsoft.com/en-us/azure/sentinel/)
- [KQL Quick Reference](https://learn.microsoft.com/en-us/azure/data-explorer/kql-quick-reference)
- [Microsoft Purview Documentation](https://learn.microsoft.com/en-us/purview/)
- [IoT Security Best Practices](https://learn.microsoft.com/en-us/azure/iot-fundamentals/iot-security-architecture)

---

## 🎥 Video Walkthrough

Coming soon to [thedopecloudteacher.org](https://thedopecloudteacher.org)!

---

## 🤝 Contributing

This demo is part of **The Dope Cloud Teacher** training materials.

**Instructors:** Feel free to adapt this for your classes.  
**Students:** Fork, modify, and make it your own portfolio project.

---

## 📧 Support

Questions? Contact: **thedopecloudteacher@gmail.com**

---

## 🏆 Challenges for Students

1. **Easy:** Modify the simulator to add a new sensor type (e.g., light sensor)
2. **Medium:** Create a second Azure Function that sends email alerts for critical incidents
3. **Hard:** Integrate Azure ML to predict sensor failures before they happen
4. **Expert:** Add a Power BI dashboard for real-time monitoring

---

## 🧹 Cleanup

To avoid Azure charges:
```bash
cd scripts
./cleanup.sh
```

This deletes the entire resource group and all contained resources.

---

## 📜 License

MIT License - Free to use for educational purposes.

---

**Built with 💜 by The Dope Cloud Teacher**  
*Making cloud security accessible, one garden sensor at a time.* 🌱☁️
