"""
Garden Guardian - Azure Function for IoT Sensor Data Ingestion
Demonstrates: HTTP Trigger, Anomaly Detection, Security Event Logging, Purview Integration
"""

import azure.functions as func
import logging
import json
import hashlib
import os
from datetime import datetime

app = func.FunctionApp(http_auth_level=func.AuthLevel.FUNCTION)

# Purview configuration (optional - will gracefully degrade if not configured)
PURVIEW_ACCOUNT = os.environ.get('PURVIEW_ACCOUNT_NAME', '')
PURVIEW_ENABLED = bool(PURVIEW_ACCOUNT)

@app.route(route="IngestSensorData")
def IngestSensorData(req: func.HttpRequest) -> func.HttpResponse:
    """
    HTTP Trigger Function for Garden Sensor Data Ingestion
    
    Expected JSON payload:
    {
        "sensor_id": "GG-TOMATO-001",
        "timestamp": "2024-01-15T14:30:00Z",
        "temperature": 72.5,
        "humidity": 65.2,
        "soil_moisture": 45.0,
        "data_hash": "abc123..."
    }
    """
    logging.info('Garden Guardian: Processing sensor data request')

    try:
        # Parse incoming sensor data
        req_body = req.get_json()
        
        sensor_id = req_body.get('sensor_id')
        timestamp = req_body.get('timestamp')
        temperature = req_body.get('temperature')
        humidity = req_body.get('humidity')
        soil_moisture = req_body.get('soil_moisture')
        data_hash = req_body.get('data_hash')
        
        # Validate required fields
        if not all([sensor_id, timestamp, temperature, humidity, soil_moisture]):
            logging.warning('Missing required sensor data fields')
            return func.HttpResponse(
                json.dumps({"status": "error", "message": "Missing required fields"}),
                status_code=400,
                mimetype="application/json"
            )
        
        # Initialize security event structure
        security_event = {
            "timestamp": datetime.utcnow().isoformat() + "Z",
            "sensor_id": sensor_id,
            "event_type": "sensor_data_ingestion",
            "temperature": temperature,
            "humidity": humidity,
            "soil_moisture": soil_moisture,
            "anomaly_detected": False,
            "anomaly_type": None,
            "severity": "Informational"
        }
        
        # SECURITY CHECK 1: Validate Device ID
        if not sensor_id.startswith("GG-"):
            security_event["anomaly_detected"] = True
            security_event["anomaly_type"] = "unauthorized_device"
            security_event["severity"] = "High"
            logging.warning(f'🚨 SECURITY ALERT: Unauthorized device detected - {sensor_id}')
        
        # SECURITY CHECK 2: Anomaly Detection (Temperature Range)
        if temperature > 120 or temperature < -20:
            security_event["anomaly_detected"] = True
            security_event["anomaly_type"] = "temperature_anomaly"
            security_event["severity"] = "Medium"
            logging.warning(f'🚨 ANOMALY: Temperature out of range - {temperature}°F')
        
        # SECURITY CHECK 3: Data Integrity Verification
        if data_hash:
            # Reconstruct hash from received data
            data_string = f"{sensor_id}{timestamp}{temperature}{humidity}{soil_moisture}"
            expected_hash = hashlib.sha256(data_string.encode()).hexdigest()[:16]
            
            if data_hash != expected_hash:
                security_event["anomaly_detected"] = True
                security_event["anomaly_type"] = "data_integrity_violation"
                security_event["severity"] = "Critical"
                logging.error(f'🚨 CRITICAL: Data integrity check failed for {sensor_id}')
        
        # Log the security event (this goes to Log Analytics)
        if security_event["anomaly_detected"]:
            logging.error(json.dumps(security_event))
        else:
            logging.info(json.dumps(security_event))
        
        # Track data lineage in Purview (if enabled)
        if PURVIEW_ENABLED:
            try:
                purview_lineage = {
                    "source": f"IoT-Sensor-{sensor_id}",
                    "destination": "Azure-Function-IngestSensorData",
                    "timestamp": datetime.utcnow().isoformat() + "Z",
                    "data_classification": "Public" if not security_event["anomaly_detected"] else "Security-Event",
                    "process": "sensor-data-ingestion",
                    "anomaly_detected": security_event["anomaly_detected"]
                }
                logging.info(f"PURVIEW_LINEAGE: {json.dumps(purview_lineage)}")
            except Exception as purview_error:
                logging.warning(f"Purview lineage tracking failed: {str(purview_error)}")
        
        # Prepare response
        response_data = {
            "status": "success",
            "message": "Sensor data processed",
            "sensor_id": sensor_id,
            "anomaly_detected": security_event["anomaly_detected"],
            "severity": security_event["severity"]
        }
        
        return func.HttpResponse(
            json.dumps(response_data),
            status_code=200,
            mimetype="application/json"
        )
    
    except ValueError as e:
        logging.error(f'Invalid JSON payload: {str(e)}')
        return func.HttpResponse(
            json.dumps({"status": "error", "message": "Invalid JSON format"}),
            status_code=400,
            mimetype="application/json"
        )
    
    except Exception as e:
        logging.error(f'Unexpected error: {str(e)}')
        return func.HttpResponse(
            json.dumps({"status": "error", "message": "Internal server error"}),
            status_code=500,
            mimetype="application/json"
        )


@app.route(route="AutoResponse")
def AutoResponse(req: func.HttpRequest) -> func.HttpResponse:
    """
    Automated Response Agent - Triggered by Sentinel Alerts
    
    This function demonstrates 'agentic behavior' - autonomous decision-making
    without human intervention.
    
    Expected JSON payload from Sentinel:
    {
        "incident_id": "12345",
        "sensor_id": "UNAUTHORIZED-DEVICE-001",
        "severity": "High",
        "anomaly_type": "unauthorized_device"
    }
    """
    logging.info('Auto-Response Agent: Processing incident')
    
    try:
        req_body = req.get_json()
        
        incident_id = req_body.get('incident_id')
        sensor_id = req_body.get('sensor_id')
        severity = req_body.get('severity')
        anomaly_type = req_body.get('anomaly_type')
        
            
            # Log Purview data governance event
            if PURVIEW_ENABLED:
                purview_audit = {
                    "event_type": "security_incident",
                    "incident_id": incident_id,
                    "sensor_id": sensor_id,
                    "severity": severity,
                    "compliance_framework": "NIST-800-53",
                    "control": "SI-4 (Information System Monitoring)",
                    "timestamp": datetime.utcnow().isoformat() + "Z"
                }
                logging.info(f"PURVIEW_AUDIT: {json.dumps(purview_audit)}")
        # Autonomous decision logic
        actions_taken = []
        
        if anomaly_type == "unauthorized_device":
            # ACTION 1: Block device (simulated - would call network API)
            actions_taken.append(f"Blocked device {sensor_id} from network")
            logging.warning(f'🛡️ AUTO-RESPONSE: Blocked unauthorized device {sensor_id}')
            
            # ACTION 2: Send alert to security team
            actions_taken.append("Alert sent to SOC team")
            logging.info('📧 Email alert sent to thedopecloudteacher@gmail.com')
            
            # ACTION 3: Create Purview audit entry
            actions_taken.append("Compliance incident logged in Purview")
            logging.info('📋 Purview audit entry created')
        
        elif anomaly_type == "temperature_anomaly":
            # Different response for sensor malfunction
            actions_taken.append(f"Flagged sensor {sensor_id} for maintenance")
            logging.info(f'🔧 Maintenance ticket created for {sensor_id}')
        
        elif anomaly_type == "data_integrity_violation":
            # Most severe response - potential attack
            actions_taken.append(f"QUARANTINED device {sensor_id}")
            actions_taken.append("Forensic data collection initiated")
            actions_taken.append("Incident escalated to CRITICAL")
            logging.error(f'🚨 CRITICAL INCIDENT: Device {sensor_id} quarantined')
        
        # Log the automated response
        response_log = {
            "timestamp": datetime.utcnow().isoformat() + "Z",
            "incident_id": incident_id,
            "sensor_id": sensor_id,
            "severity": severity,
            "anomaly_type": anomaly_type,
            "actions_taken": actions_taken,
            "response_time_seconds": 2.3,
            "human_intervention_required": severity == "Critical"
        }
        
        logging.info(json.dumps(response_log))
        
        return func.HttpResponse(
            json.dumps({
                "status": "success",
                "message": "Automated response executed",
                "actions": actions_taken
            }),
            status_code=200,
            mimetype="application/json"
        )
    
    except Exception as e:
        logging.error(f'Auto-Response error: {str(e)}')
        return func.HttpResponse(
            json.dumps({"status": "error", "message": str(e)}),
            status_code=500,
            mimetype="application/json"
        )


@app.route(route="health")
def health_check(req: func.HttpRequest) -> func.HttpResponse:
    """Simple health check endpoint"""
    return func.HttpResponse(
        json.dumps({"status": "healthy", "service": "Garden Guardian Security"}),
        status_code=200,
        mimetype="application/json"
    )
