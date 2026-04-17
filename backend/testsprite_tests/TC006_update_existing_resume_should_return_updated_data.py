import requests

BASE_URL = "http://localhost:8000"
TIMEOUT = 30


def test_update_existing_resume_should_return_updated_data():
    # Step 1: Create a new resume to get an existing resume ID
    create_url = f"{BASE_URL}/api/resume"
    new_resume_payload = {
        # Minimal example payload for ResumeDataModel; adapt as needed for real schema
        "name": "John Doe",
        "email": "john.doe@example.com",
        "phone": "123-456-7890",
        "summary": "Experienced software engineer.",
        "work_experience": [
            {
                "company": "ABC Corp",
                "position": "Developer",
                "start_date": "2020-01-01",
                "end_date": "2022-01-01",
                "description": "Developed software solutions."
            }
        ],
        "education": [
            {
                "institution": "XYZ University",
                "degree": "BSc Computer Science",
                "start_date": "2016-09-01",
                "end_date": "2020-06-01"
            }
        ],
        "skills": ["Python", "FastAPI", "SQL"]
    }

    resume_id = None

    try:
        create_response = requests.post(create_url, json=new_resume_payload, timeout=TIMEOUT)
        assert create_response.status_code == 200, f"Failed to create resume: {create_response.text}"
        created_resume = create_response.json()
        assert isinstance(created_resume, dict), "Created resume response is not a JSON object"
        assert "id" in created_resume, "Created resume response missing 'id'"
        resume_id = created_resume["id"]

        # Step 2: Update the created resume via PUT /api/resume/{id}
        update_url = f"{BASE_URL}/api/resume/{resume_id}"

        # Updated payload (modify some fields)
        updated_resume_payload = created_resume.copy()
        updated_resume_payload["summary"] = "Senior software engineer with expertise in backend development."
        updated_resume_payload["skills"].append("Docker")

        update_response = requests.put(update_url, json=updated_resume_payload, timeout=TIMEOUT)
        assert update_response.status_code == 200, f"Update failed: {update_response.text}"

        updated_resume = update_response.json()
        assert isinstance(updated_resume, dict), "Updated resume response is not a JSON object"
        assert updated_resume.get("id") == resume_id, "Updated resume ID does not match"
        assert updated_resume.get("summary") == "Senior software engineer with expertise in backend development."
        assert "Docker" in updated_resume.get("skills", [])

    finally:
        # Cleanup: Delete the resume if it was created
        if resume_id:
            delete_url = f"{BASE_URL}/api/resume/{resume_id}"
            delete_response = requests.delete(delete_url, timeout=TIMEOUT)
            # It's ok if delete fails here, no assertion on cleanup


test_update_existing_resume_should_return_updated_data()