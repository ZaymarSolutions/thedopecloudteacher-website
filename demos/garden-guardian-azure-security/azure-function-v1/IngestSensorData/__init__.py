"""
Garden Guardian - IngestSensorData Function
Demonstrates: HTTP Trigger, Anomaly Detection, Security Event Logging, Purview Integration
"""

import azure.functions as func
import logging
import json
import hashlib
import os
from datetime import datetime

# Purview configuration (optional - will gracefully degrade if not configured)
PURVIEW_ACCOUNT = os.environ.get('PURVIEW_ACCOUNT_NAME', '')
PURVIEW_ENABLED = bool(PURVIEW_ACCOUNT)


def main(req: func.HttpRequest) -> func.HttpResponse:
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
