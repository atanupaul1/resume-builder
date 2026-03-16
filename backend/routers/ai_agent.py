# backend/routers/ai_agent.py
from fastapi import APIRouter, HTTPException
from models import AIRequestModel, AIResponseModel
from services.gemini_service import GeminiResumeAgent

router = APIRouter(prefix="/api/ai", tags=["AI"])
agent = GeminiResumeAgent()

@router.post("/enhance", response_model=AIResponseModel)
async def enhance_section(request: AIRequestModel):
    return agent.enhance_section(request)

@router.post("/summary")
async def generate_summary(resume_data: dict):
    summary = agent.generate_summary(resume_data)
    return {"summary": summary}

@router.post("/score")
async def score_resume(resume_data: dict):
    return agent.score_resume(resume_data)

@router.post("/autofill")
async def autofill(data: dict):
    jd_text = data.get("job_description")
    section_type = data.get("section_type")
    if not jd_text or not section_type:
        raise HTTPException(status_code=400, detail="Missing jd_text or section_type")
    return agent.autofill_from_job_description(jd_text, section_type)

@router.post("/keywords")
async def keywords(data: dict):
    job_title = data.get("job_title")
    industry = data.get("industry")
    if not job_title or not industry:
        raise HTTPException(status_code=400, detail="Missing job_title or industry")
    keywords = agent.suggest_keywords(job_title, industry)
    return {"keywords": keywords}
