"""
Garden Guardian - Health Check Function
"""

import azure.functions as func
import json


def main(req: func.HttpRequest) -> func.HttpResponse:
    """Simple health check endpoint"""
    return func.HttpResponse(
        json.dumps({"status": "healthy", "service": "Garden Guardian Security"}),
        status_code=200,
        mimetype="application/json"
    )
