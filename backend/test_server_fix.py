import requests
import io

BASE_URL = "http://localhost:8001"

def test_corrupted_upload():
    print("Testing corrupted upload...")
    url = f"{BASE_URL}/api/resume/upload"
    corrupted_content = b"%PDF-1.4 corrupted content..."
    files = {"file": ("corrupted.pdf", corrupted_content, "application/pdf")}
    resp = requests.post(url, files=files)
    print(f"Status: {resp.status_code}, Detail: {resp.text}")
    assert resp.status_code == 400

def test_create_resume():
    print("Testing create resume...")
    url = f"{BASE_URL}/api/resume"
    payload = {
        "name": "Test Name", # Extra field
        "title": "Fullstack Resume",
        "sections": {"experience": []},
        "theme": {"primaryColor": "#ff0000"},
        "template": "modern"
    }
    resp = requests.post(url, json=payload)
    print(f"Status: {resp.status_code}, Detail: {resp.text}")
    assert resp.status_code == 200
    
try:
    test_corrupted_upload()
    test_create_resume()
    print("Self-test SUCCESS!")
except Exception as e:
    print(f"Self-test FAILED: {e}")
