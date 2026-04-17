import requests

BASE_URL = "http://localhost:8000"
TIMEOUT = 30

def test_update_nonexistent_resume_should_return_404():
    # This ID is assumed to not exist in the system
    nonexistent_resume_id = "00000000-0000-0000-0000-000000000000"

    updated_resume_data = {
        # Minimal plausible ResumeDataModel payload for update
        "name": "John Doe",
        "email": "johndoe@example.com",
        "phone": "+1234567890",
        "summary": "Experienced software engineer with a focus on backend development.",
        "skills": ["Python", "FastAPI", "SQLModel"],
        "experience": [
            {
                "company": "Example Corp",
                "role": "Software Engineer",
                "start_date": "2020-01-01",
                "end_date": "2023-01-01",
                "description": "Developed API services using FastAPI."
            }
        ],
        "education": [
            {
                "institution": "Example University",
                "degree": "B.Sc. Computer Science",
                "start_date": "2016-09-01",
                "end_date": "2020-06-01"
            }
        ],
        "projects": [],
        "certifications": []
    }

    url = f"{BASE_URL}/api/resume/{nonexistent_resume_id}"
    headers = {"Content-Type": "application/json"}

    try:
        response = requests.put(url, json=updated_resume_data, headers=headers, timeout=TIMEOUT)
    except requests.RequestException as e:
        assert False, f"Request failed: {e}"

    assert response.status_code == 404, f"Expected status code 404, got {response.status_code}"

    try:
        resp_json = response.json()
    except ValueError:
        assert False, "Response body is not valid JSON"

    assert "Resume not found" in resp_json.get("detail", "") or "error" in resp_json, \
        "Response JSON does not contain expected 'Resume not found' message"

test_update_nonexistent_resume_should_return_404()