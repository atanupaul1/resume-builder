import requests
from requests.exceptions import RequestException

BASE_URL = "http://localhost:8000"
TIMEOUT = 30

def test_upload_resume_file_should_parse_and_create_resume():
    upload_url = f"{BASE_URL}/api/resume/upload"
    create_resume_url = f"{BASE_URL}/api/resume"
    # Example content of a valid resume file (as plain text or bytes)
    # Usually a file like PDF, DOCX, or TXT but here using plain text for test
    resume_content = b"""John Doe
    Email: johndoe@example.com
    Experience: Software Developer at ExampleCorp (2019-2023)
    Skills: Python, FastAPI, SQLModel
    Education: B.Sc. Computer Science
    """

    files = {
        "file": ("resume.txt", resume_content, "text/plain"),
    }

    created_resume_id = None

    try:
        # Step 1: Upload and parse the resume file
        upload_response = requests.post(upload_url, files=files, timeout=TIMEOUT)
        assert upload_response.status_code == 200, f"Upload failed with status {upload_response.status_code}"

        parsed_resume = upload_response.json()
        assert isinstance(parsed_resume, dict), "Parsed resume response is not a JSON object"

        # Check minimal expected fields in parsed resume data (depends on schema but typically includes fields)
        # Since schema details are not fully provided, just check presence of some keys
        assert "name" in parsed_resume or "full_name" in parsed_resume or "contact" in parsed_resume, \
            "Parsed resume data missing expected keys"

        # Step 2: Create a new resume record using parsed resume data
        headers = {"Content-Type": "application/json"}
        create_response = requests.post(create_resume_url, json=parsed_resume, headers=headers, timeout=TIMEOUT)
        assert create_response.status_code == 200, f"Create resume failed with status {create_response.status_code}"

        created_resume = create_response.json()
        assert isinstance(created_resume, dict), "Created resume response is not a JSON object"
        # Check presence of an ID or unique identifier to identify the created resume
        # Guessing 'id' field as common identifier
        assert "id" in created_resume, "Created resume data missing 'id' field"
        created_resume_id = created_resume["id"]

    except RequestException as e:
        assert False, f"Request failed: {e}"
    finally:
        # Cleanup: delete the created resume if it exists
        if created_resume_id is not None:
            delete_url = f"{BASE_URL}/api/resume/{created_resume_id}"
            try:
                delete_response = requests.delete(delete_url, timeout=TIMEOUT)
                assert delete_response.status_code == 200, f"Cleanup delete failed with status {delete_response.status_code}"
            except Exception:
                # If cleanup fails, just pass since test main flow finished
                pass

test_upload_resume_file_should_parse_and_create_resume()
