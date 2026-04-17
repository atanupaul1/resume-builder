import requests
import json

BASE_URL = "http://localhost:8000"
TIMEOUT = 30


def test_delete_existing_resume_should_return_ok():
    # Create a new resume to ensure there is an existing resume to delete
    create_resume_url = f"{BASE_URL}/api/resume"
    # Example minimal ResumeDataModel payload; adjust fields as per actual schema if known
    resume_payload = {
        "name": "Test Resume",
        "email": "test@example.com",
        "phone": "123-456-7890",
        "summary": "Test summary",
        "work_experience": [],
        "education": [],
        "skills": []
    }

    headers = {"Content-Type": "application/json"}

    created_resume_id = None

    try:
        create_response = requests.post(
            create_resume_url, headers=headers, data=json.dumps(resume_payload), timeout=TIMEOUT
        )
        assert create_response.status_code == 200, f"Failed to create resume: {create_response.text}"
        created_resume = create_response.json()
        assert "id" in created_resume, "Created resume response missing 'id'"
        created_resume_id = created_resume["id"]

        delete_url = f"{BASE_URL}/api/resume/{created_resume_id}"
        delete_response = requests.delete(delete_url, timeout=TIMEOUT)
        assert delete_response.status_code == 200, f"Unexpected status code on delete: {delete_response.status_code}"
    finally:
        # Cleanup: try to delete the resume if it wasn't deleted yet
        if created_resume_id is not None:
            requests.delete(f"{BASE_URL}/api/resume/{created_resume_id}", timeout=TIMEOUT)


test_delete_existing_resume_should_return_ok()