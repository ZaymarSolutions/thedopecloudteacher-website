"""
Garden Guardian - IoT Sensor Simulator
Generates realistic and attack scenario sensor data for Azure demo
"""

import requests
import json
import time
import random
import hashlib
import argparse
from datetime import datetime
import os

# Configuration - UPDATED WITH YOUR AZURE FUNCTION
FUNCTION_URL = "https://func-garden-guardian.azurewebsites.net/api/IngestSensorData"
FUNCTION_KEY = os.environ.get("AZURE_FUNCTION_KEY", "YOUR_FUNCTION_KEY_HERE")

# Legitimate sensor IDs (authorized devices)
LEGITIMATE_SENSORS = [
    "GG-TOMATO-001",
    "GG-CUCUMBER-002",
    "GG-PEPPER-003",
    "GG-HERB-GARDEN-004",
    "GG-BERRY-PATCH-005"
]

# Unauthorized device (for attack simulation)
UNAUTHORIZED_SENSOR = "HACKER-DEVICE-999"


def generate_sensor_data(sensor_id, anomaly_type=None):
    """Generate sensor data with optional anomalies"""
    
    timestamp = datetime.utcnow().isoformat() + "Z"
    
    # Normal operating ranges
    if anomaly_type == "temperature_extreme":
        temperature = random.uniform(150, 180)  # Way too hot!
    elif anomaly_type == "temperature_cold":
        temperature = random.uniform(-50, -30)  # Way too cold!
    else:
        temperature = round(random.uniform(60, 85), 1)  # Normal: 60-85°F
    
    humidity = round(random.uniform(40, 80), 1)  # 40-80% is normal
    soil_moisture = round(random.uniform(30, 70), 1)  # 30-70% is healthy
    
    # Calculate data integrity hash
    data_string = f"{sensor_id}{timestamp}{temperature}{humidity}{soil_moisture}"
    
    if anomaly_type == "data_tampering":
        # Simulate tampered data with mismatched hash
        data_hash = "FAKE_HASH_12345"
    else:
        data_hash = hashlib.sha256(data_string.encode()).hexdigest()[:16]
    
    payload = {
        "sensor_id": sensor_id,
        "timestamp": timestamp,
        "temperature": temperature,
        "humidity": humidity,
        "soil_moisture": soil_moisture,
        "data_hash": data_hash
    }
    
    return payload


def send_sensor_data(payload):
    """Send sensor data to Azure Function"""
    
    headers = {
        "Content-Type": "application/json",
        "x-functions-key": FUNCTION_KEY
    }
    
    try:
        response = requests.post(FUNCTION_URL, json=payload, headers=headers, timeout=10)
        
        # Color-coded console output
        if response.status_code == 200:
            result = response.json()
            if result.get("anomaly_detected"):
                print(f"🚨 [{result['severity']}] {payload['sensor_id']} - ANOMALY DETECTED")
            else:
                print(f"✅ [OK] {payload['sensor_id']} - {result['message']}")
        else:
            print(f"❌ [ERROR] {payload['sensor_id']} - HTTP {response.status_code}")
            print(f"   Response: {response.text}")
    
    except requests.exceptions.RequestException as e:
        print(f"❌ [NETWORK ERROR] Failed to send data: {str(e)}")


def run_normal_operation(duration_seconds=60):
    """Simulate normal garden sensor operations"""
    
    print("\n🌱 Starting NORMAL OPERATION simulation...")
    print(f"   Duration: {duration_seconds} seconds")
    print(f"   Sensors: {len(LEGITIMATE_SENSORS)} devices")
    print("-" * 60)
    
    start_time = time.time()
    iteration = 0
    
    while (time.time() - start_time) < duration_seconds:
        iteration += 1
        print(f"\n[Iteration {iteration}] {datetime.now().strftime('%H:%M:%S')}")
        
        # Each sensor sends data
        for sensor_id in LEGITIMATE_SENSORS:
            payload = generate_sensor_data(sensor_id)
            send_sensor_data(payload)
            time.sleep(0.5)  # Small delay between sensors
        
        time.sleep(10)  # Wait 10 seconds before next round
    
    print("\n✅ Normal operation simulation complete")


def run_attack_scenario():
    """Simulate various attack scenarios"""
    
    print("\n🚨 Starting ATTACK SCENARIO simulation...")
    print("   This will trigger security alerts in Sentinel")
    print("-" * 60)
    
    # ATTACK 1: Unauthorized Device
    print("\n[ATTACK 1] Unauthorized device attempting to send data...")
    payload = generate_sensor_data(UNAUTHORIZED_SENSOR)
    send_sensor_data(payload)
    time.sleep(2)
    
    # ATTACK 2: Temperature Anomaly (extreme heat)
    print("\n[ATTACK 2] Sending extreme temperature reading...")
    payload = generate_sensor_data("GG-TOMATO-001", anomaly_type="temperature_extreme")
    send_sensor_data(payload)
    time.sleep(2)
    
    # ATTACK 3: Temperature Anomaly (extreme cold)
    print("\n[ATTACK 3] Sending extreme cold reading...")
    payload = generate_sensor_data("GG-CUCUMBER-002", anomaly_type="temperature_cold")
    send_sensor_data(payload)
    time.sleep(2)
    
    # ATTACK 4: Data Tampering
    print("\n[ATTACK 4] Attempting data integrity violation...")
    payload = generate_sensor_data("GG-PEPPER-003", anomaly_type="data_tampering")
    send_sensor_data(payload)
    time.sleep(2)
    
    # ATTACK 5: Rapid fire unauthorized device (DDoS simulation)
    print("\n[ATTACK 5] DDoS simulation - rapid unauthorized requests...")
    for i in range(5):
        payload = generate_sensor_data(f"BOTNET-{i:03d}")
        send_sensor_data(payload)
        time.sleep(0.2)
    
    print("\n✅ Attack scenario simulation complete")
    print("\n📊 Check Microsoft Sentinel for detected incidents:")
    print("   1. Go to Azure Portal → Microsoft Sentinel")
    print("   2. Navigate to 'Incidents' blade")
    print("   3. You should see 'Unauthorized Device Detected' alerts")


def run_mixed_scenario(duration_seconds=120):
    """Simulate mix of normal and attack traffic"""
    
    print("\n🎭 Starting MIXED SCENARIO simulation...")
    print(f"   Duration: {duration_seconds} seconds")
    print("   Mix: 80% legitimate, 20% attack traffic")
    print("-" * 60)
    
    start_time = time.time()
    iteration = 0
    
    while (time.time() - start_time) < duration_seconds:
        iteration += 1
        print(f"\n[Iteration {iteration}] {datetime.now().strftime('%H:%M:%S')}")
        
        # 80% chance of legitimate traffic
        if random.random() < 0.8:
            sensor_id = random.choice(LEGITIMATE_SENSORS)
            payload = generate_sensor_data(sensor_id)
        else:
            # 20% chance of attack
            attack_type = random.choice([
                "unauthorized",
                "temperature_extreme",
                "data_tampering"
            ])
            
            if attack_type == "unauthorized":
                sensor_id = UNAUTHORIZED_SENSOR
                payload = generate_sensor_data(sensor_id)
            elif attack_type == "temperature_extreme":
                sensor_id = random.choice(LEGITIMATE_SENSORS)
                payload = generate_sensor_data(sensor_id, anomaly_type="temperature_extreme")
            else:
                sensor_id = random.choice(LEGITIMATE_SENSORS)
                payload = generate_sensor_data(sensor_id, anomaly_type="data_tampering")
        
        send_sensor_data(payload)
        time.sleep(5)  # 5 seconds between requests
    
    print("\n✅ Mixed scenario simulation complete")


def main():
    parser = argparse.ArgumentParser(description="Garden Guardian IoT Sensor Simulator")
    parser.add_argument(
        "--mode",
        choices=["normal", "attack", "mixed", "single"],
        default="normal",
        help="Simulation mode (default: normal)"
    )
    parser.add_argument(
        "--duration",
        type=int,
        default=60,
        help="Duration in seconds for normal/mixed modes (default: 60)"
    )
    parser.add_argument(
        "--sensor",
        type=str,
        help="Specific sensor ID for single mode"
    )
    
    args = parser.parse_args()
    
    # Check configuration
    if FUNCTION_URL == "https://func-garden-guardian.azurewebsites.net/api/IngestSensorData":
        print("⚠️  WARNING: Using default Function URL")
        print("   Update FUNCTION_URL in this script after deploying Azure Function")
        print()
    
    if FUNCTION_KEY == "YOUR_FUNCTION_KEY_HERE":
        print("❌ ERROR: Function key not configured")
        print("   Update FUNCTION_KEY in this script with your Azure Function key")
        print("\nTo get your function key:")
        print("   1. Go to Azure Portal → Function App")
        print("   2. Select 'IngestSensorData' function")
        print("   3. Click 'Function Keys' → Copy default key")
        return
    
    # Run selected mode
    if args.mode == "normal":
        run_normal_operation(args.duration)
    elif args.mode == "attack":
        run_attack_scenario()
    elif args.mode == "mixed":
        run_mixed_scenario(args.duration)
    elif args.mode == "single":
        if args.sensor:
            payload = generate_sensor_data(args.sensor)
            send_sensor_data(payload)
        else:
            print("❌ ERROR: --sensor parameter required for single mode")


if __name__ == "__main__":
    print("""
    ╔═══════════════════════════════════════════════════════╗
    ║   🌱 Garden Guardian IoT Sensor Simulator 🌱         ║
    ║   Azure Security Demo - The Dope Cloud Teacher       ║
    ╚═══════════════════════════════════════════════════════╝
    """)
    
    main()
