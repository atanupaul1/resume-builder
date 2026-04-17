import requests

BASE_URL = "http://localhost:8000"
TIMEOUT = 30

def test_get_resume_by_valid_id_should_return_resume_data():
    # Step 1: Create a new resume to get a valid ID
    create_resume_url = f"{BASE_URL}/api/resume"
    # Minimal valid ResumeDataModel payload (example, adjust fields as needed)
    resume_payload = {
        "full_name": "John Doe",
        "email": "john.doe@example.com",
        "phone": "123-456-7890",
        "summary": "Experienced software engineer",
        "education": [
            {
                "institution": "Test University",
                "degree": "BSc Computer Science",
                "start_date": "2018-09-01",
                "end_date": "2022-06-01",
                "details": "Graduated with honors"
            }
        ],
        "experience": [
            {
                "company": "Test Corp",
                "position": "Developer",
                "start_date": "2022-07-01",
                "end_date": "Present",
                "details": "Worked on backend APIs"
            }
        ],
        "skills": ["Python", "FastAPI", "SQL"]
    }

    resume_id = None
    try:
        create_resp = requests.post(create_resume_url, json=resume_payload, timeout=TIMEOUT)
        assert create_resp.status_code == 200, f"Create resume failed with status {create_resp.status_code}"
        created_resume = create_resp.json()
        assert "id" in created_resume, "Created resume response missing 'id'"
        resume_id = created_resume["id"]

        # Step 2: Retrieve the resume by valid ID
        get_resume_url = f"{BASE_URL}/api/resume/{resume_id}"
        get_resp = requests.get(get_resume_url, timeout=TIMEOUT)
        assert get_resp.status_code == 200, f"Get resume failed with status {get_resp.status_code}"
        resume_data = get_resp.json()
        # Validate some fields match what was created
        assert resume_data.get("id") == resume_id
        assert resume_data.get("full_name") == resume_payload["full_name"]
        assert resume_data.get("email") == resume_payload["email"]

    finally:
        # Cleanup: delete the created resume if it was created
        if resume_id:
            delete_url = f"{BASE_URL}/api/resume/{resume_id}"
            del_resp = requests.delete(delete_url, timeout=TIMEOUT)
            assert del_resp.status_code == 200 or del_resp.status_code == 404  # allow 404 in case already deleted

test_get_resume_by_valid_id_should_return_resume_data()