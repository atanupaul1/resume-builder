# backend/services/gemini_service.py
import os
import json
import google.generativeai as genai
from dotenv import load_dotenv
from models import AIRequestModel, AIResponseModel

load_dotenv()

class GeminiResumeAgent:
    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY not found in environment variables")
        
        genai.configure(api_key=api_key)
        
        system_instruction = """
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
        self.model = genai.GenerativeModel(
            model_name="gemini-1.5-flash",
            system_instruction=system_instruction
        )

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
            response = self.model.generate_content(prompt)
            data = json.loads(response.text.strip().replace('```json', '').replace('```', ''))
            return AIResponseModel(**data)
        except Exception as e:
            print(f"Error calling Gemini: {e}")
            # Simplified fallback
            return AIResponseModel(
                improved=request.content,
                alternatives=[],
                missingKeywords=[],
                score=0,
                tips=["Error connecting to AI service. Please try again later."]
            )

    def generate_summary(self, resume_data: dict) -> str:
        prompt = f"Based on this resume data: {json.dumps(resume_data)}, write a professional summary (3-4 sentences)."
        try:
            response = self.model.generate_content(prompt)
            return response.text.strip()
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
            response = self.model.generate_content(prompt)
            return json.loads(response.text.strip().replace('```json', '').replace('```', ''))
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
            response = self.model.generate_content(prompt)
            return json.loads(response.text.strip().replace('```json', '').replace('```', ''))
        except Exception as e:
            return {"content": ""}

    def suggest_keywords(self, job_title: str, industry: str) -> list[str]:
        prompt = f"Suggest the top 15 ATS keywords for a {job_title} in the {industry} industry. Return as a JSON list of strings."
        try:
            response = self.model.generate_content(prompt)
            return json.loads(response.text.strip().replace('```json', '').replace('```', ''))
        except Exception as e:
            return []
