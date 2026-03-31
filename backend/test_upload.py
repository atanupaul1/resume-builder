import requests
import json
import sys

# Test the FastAPI endpoint
url = "http://localhost:8000/api/resume/upload"

try:
    with open("dummy_resume.txt", "rb") as f:
        files = {"file": ("dummy_resume.txt", f, "text/plain")}
        print(f"Uploading dummy_resume.txt to {url}...")
        response = requests.post(url, files=files)
        
        if response.status_code == 200:
            print("Successfully parsed resume!")
            print(json.dumps(response.json(), indent=2))
        else:
            print(f"Failed with status code: {response.status_code}")
            print(response.text)
except requests.exceptions.ConnectionError:
    print("Backend server is not running on localhost:8000. Please start the server.", file=sys.stderr)
    sys.exit(1)
except Exception as e:
    print(f"Error: {e}", file=sys.stderr)
    sys.exit(1)
