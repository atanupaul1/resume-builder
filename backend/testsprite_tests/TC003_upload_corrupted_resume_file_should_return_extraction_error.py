import requests

BASE_URL = "http://localhost:8000"

def upload_corrupted_resume_file_should_return_extraction_error():
    url = f"{BASE_URL}/api/resume/upload"
    corrupted_content = b"%PDF-1.4 corrupted content that is not a valid resume file..."

    files = {
        "file": ("corrupted_resume.pdf", corrupted_content, "application/pdf")
    }

    try:
        response = requests.post(url, files=files, timeout=30)
    except requests.RequestException as e:
        assert False, f"Request failed: {e}"

    assert response.status_code == 400, f"Expected status code 400 but got {response.status_code}"
    try:
        json_response = response.json()
    except ValueError:
        assert False, "Response is not valid JSON"

    error_message = json_response.get("detail") or json_response.get("error") or json_response.get("message")
    assert error_message is not None, "Error message not found in response"
    assert "extraction error" in error_message.lower(), f"Expected extraction error message, got: {error_message}"

upload_corrupted_resume_file_should_return_extraction_error()