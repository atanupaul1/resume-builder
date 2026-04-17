import requests

BASE_URL = "http://localhost:8000"


def test_get_resume_by_nonexistent_id_should_return_404():
    nonexistent_id = "00000000-0000-0000-0000-000000000000"
    url = f"{BASE_URL}/api/resume/{nonexistent_id}"
    try:
        response = requests.get(url, timeout=30)
    except requests.RequestException as e:
        assert False, f"Request failed: {e}"
    assert response.status_code == 404, f"Expected status 404, got {response.status_code}"
    try:
        error_data = response.json()
    except ValueError:
        assert False, "Response is not valid JSON"
    # The error message should indicate 'Resume not found' per PRD
    assert (
        "resume not found" in str(error_data).lower()
    ), f"Expected 'Resume not found' error message, got {error_data}"


test_get_resume_by_nonexistent_id_should_return_404()