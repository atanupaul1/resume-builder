import requests

BASE_URL = "http://localhost:8000"
TIMEOUT = 30

def test_get_resume_templates_should_return_list_of_templates():
    url = f"{BASE_URL}/api/resume/templates"
    try:
        response = requests.get(url, timeout=TIMEOUT)
        response.raise_for_status()
    except requests.RequestException as e:
        assert False, f"Request failed: {e}"

    assert response.status_code == 200, f"Expected status code 200, got {response.status_code}"
    try:
        templates = response.json()
    except ValueError:
        assert False, "Response is not a valid JSON"

    assert isinstance(templates, list), "Response JSON is not a list"

    for template in templates:
        assert isinstance(template, dict), "Each template must be a dictionary"
        # Check for thumbnail field (likely a URL or string)
        assert "thumbnail" in template, "Template missing 'thumbnail' key"
        # Check for configuration details field (name could vary, so check at least one config key presence)
        # From the PRD, template config details included in TemplateConfigModel, so look for a 'config' or similar
        # We check at least one key besides thumbnail is present
        config_present = any(k for k in template.keys() if k != "thumbnail")
        assert config_present, "Template must include configuration details besides thumbnail"

test_get_resume_templates_should_return_list_of_templates()