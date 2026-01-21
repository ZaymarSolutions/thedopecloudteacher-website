"""
Garden Guardian - AutoResponse Function
Automated Response Agent - Triggered by Sentinel Alerts
"""

import azure.functions as func
import logging
import json
import os
from datetime import datetime

PURVIEW_ACCOUNT = os.environ.get('PURVIEW_ACCOUNT_NAME', '')
PURVIEW_ENABLED = bool(PURVIEW_ACCOUNT)


def main(req: func.HttpRequest) -> func.HttpResponse:
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
