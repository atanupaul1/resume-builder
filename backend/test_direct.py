from services.gemini_service import GeminiResumeAgent
import json
import sys

try:
    with open("dummy_resume.txt", "r") as f:
        text = f.read()
    
    agent = GeminiResumeAgent()
    print("Testing parse_resume with Gemini-2.0-flash...")
    result = agent.parse_resume(text)
    
    if "error" in result:
        print(f"Failed with error: {result['error']}")
        sys.exit(1)
        
    print("Successfully parsed resume!")
    print(json.dumps(result, indent=2))
except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)
