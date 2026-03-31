# backend/services/gemini_service.py
import os
import json
import requests
from dotenv import load_dotenv
from models import AIRequestModel, AIResponseModel

load_dotenv()

class GeminiResumeAgent:
    def __init__(self):
        self.api_key = os.getenv("GEMINI_API_KEY")
        if not self.api_key:
            raise ValueError("GEMINI_API_KEY not found in environment variables")
        
        self.model_name = "gemini-2.5-flash"
        self.url = f"https://generativelanguage.googleapis.com/v1beta/models/{self.model_name}:generateContent?key={self.api_key}"
        
        self.system_instruction = """
You are an elite resume writing expert and career coach with 20 years of 
experience helping candidates land jobs at top companies including Google, 
Meta, Amazon, and leading startups. You specialize in:
- Writing powerful, quantified achievement bullet points
- ATS (Applicant Tracking System) optimization  
- Tailoring resumes to specific job descriptions
- Industry-specific keyword injection
- Professional tone calibration

Your responses must ALWAYS be valid JSON matching the exact schema provided.
Never add markdown code fences, preamble, or explanation outside the JSON.
Be direct, specific, and actionable. Never fabricate statistics or facts
the user has not provided — instead, add [NUMBER] or [METRIC] placeholders
where quantification is needed.
"""

    def _call_gemini(self, prompt: str, system_instruction: str = None) -> dict:
        headers = {"Content-Type": "application/json"}
        payload = {
            "contents": [{"parts": [{"text": prompt}]}],
            "systemInstruction": {"parts": [{"text": system_instruction or self.system_instruction}]},
            "generationConfig": {
                "responseMimeType": "application/json"
            }
        }
        
        response = requests.post(self.url, headers=headers, json=payload)
        
        if not response.ok:
            raise Exception(f"API Error {response.status_code}: {response.text}")
            
        data = response.json()
        text_response = data.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "")
        if not text_response:
            raise Exception("Empty response from model")
            
        return json.loads(text_response.strip())

    def enhance_section(self, request: AIRequestModel) -> AIResponseModel:
        prompt = f"""
Analyze this {request.sectionType} section and return a JSON response.
Current content: {request.content}
Target role: {request.targetRole or 'not specified'}
Job description: {request.jobDescription or 'not provided'}

Return ONLY this JSON structure:
{{
  "improved": "rewritten version with strong action verbs and metrics",
  "alternatives": ["option 2", "option 3"],
  "missingKeywords": ["keyword1", "keyword2"],
  "score": 0-100 integer rating of original content,
  "tips": ["specific tip 1", "specific tip 2", "specific tip 3"]
}}
"""
        try:
            data = self._call_gemini(prompt)
            return AIResponseModel(**data)
        except Exception as e:
            print(f"Error calling Gemini: {e}")
            return AIResponseModel(
                improved=request.content,
                alternatives=[],
                missingKeywords=[],
                score=0,
                tips=["Error connecting to AI service. Please try again later."]
            )

    def generate_summary(self, resume_data: dict) -> str:
        prompt = f"""
Based on this resume data: {json.dumps(resume_data)}, write a professional summary (3-4 sentences).
Return ONLY this JSON structure:
{{
  "summary": "generated professional summary here"
}}
"""
        try:
            data = self._call_gemini(prompt)
            return data.get("summary", "Professional summary could not be generated.")
        except Exception as e:
            return "Professional summary could not be generated at this time."

    def score_resume(self, resume_data: dict) -> dict:
        prompt = f"""
Analyze this resume and provide a score breakdown in JSON format:
{json.dumps(resume_data)}

Return ONLY this JSON structure:
{{
  "overall": 85,
  "sections": {{
    "experience": 80,
    "skills": 90,
    "education": 100
  }},
  "topIssues": ["issue 1", "issue 2"],
  "quickWins": ["win 1", "win 2"]
}}
"""
        try:
            return self._call_gemini(prompt)
        except Exception as e:
            return {"overall": 0, "sections": {}, "topIssues": ["Could not score"], "quickWins": []}

    def autofill_from_job_description(self, jd_text: str, section_type: str) -> dict:
        prompt = f"""
Analyze this job description: {jd_text}
Generate a matching resume section for: {section_type}
Return JSON:
{{
  "content": "Generated content here"
}}
"""
        try:
            return self._call_gemini(prompt)
        except Exception as e:
            return {"content": ""}

    def suggest_keywords(self, job_title: str, industry: str) -> list[str]:
        prompt = f"""
Suggest the top 15 ATS keywords for a {job_title} in the {industry} industry. 
Return ONLY this JSON structure:
{{
    "keywords": ["keyword 1", "keyword 2"]
}}
"""
        try:
            data = self._call_gemini(prompt)
            return data.get("keywords", [])
        except Exception as e:
            return []
            
    def parse_resume(self, text: str) -> dict:
        prompt = f"""
Parse the following raw resume/CV text into a structured JSON format.
Extract as much detail as possible. Do not invent any information. If a field isn't present, leave it empty.
For IDs like exp-1, edu-1, skg-1, generate simple sequential strings.

Raw Resume Text:
{text}
"""
        parser_system_instruction = """
Return ONLY this JSON structure matching exactly this schema, populated with the extracted data:
{
  "personalInfo": {
    "fullName": "",
    "jobTitle": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "website": ""
  },
  "summary": "Professional summary or objective.",
  "workExperience": [
    {
      "id": "exp-1",
      "company": "",
      "role": "",
      "startDate": "",
      "endDate": "",
      "current": false,
      "location": "",
      "bullets": ["bullet 1", "bullet 2"]
    }
  ],
  "education": [
    {
       "id": "edu-1",
       "institution": "",
       "degree": "",
       "field": "",
       "startDate": "",
       "endDate": "",
       "current": false,
       "grade": "",
       "location": ""
    }
  ],
  "skillGroups": [
    {
       "id": "skg-1",
       "category": "",
       "skills": ["skill 1"]
    }
  ],
  "contact": {
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "website": "",
    "github": ""
  }
}
"""
        try:
            return self._call_gemini(prompt, parser_system_instruction)
        except Exception as e:
            err_msg = f"Error parsing resume via Gemini: {str(e)}"
            print(err_msg, flush=True)
            return {"error": err_msg}
