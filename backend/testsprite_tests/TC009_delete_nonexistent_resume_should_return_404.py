import requests

BASE_URL = "http://localhost:8000"
TIMEOUT = 30

def test_delete_nonexistent_resume_should_return_404():
    nonexistent_id = "nonexistent-resume-id-1234567890"
    url = f"{BASE_URL}/api/resume/{nonexistent_id}"
    try:
        response = requests.delete(url, timeout=TIMEOUT)
    except requests.RequestException as e:
        assert False, f"Request failed: {e}"

    assert response.status_code == 404, f"Expected status code 404 but got {response.status_code}"
    try:
        json_response = response.json()
    except ValueError:
        assert False, "Response is not valid JSON"

    assert "Resume not found" in str(json_response), f"Expected error message 'Resume not found' in response but got: {json_response}"

test_delete_nonexistent_resume_should_return_404()