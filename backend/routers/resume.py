from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlmodel import Session, select
from database import get_session
from models import ResumeDataModel, TemplateConfigModel
from typing import List
from utils.file_parser import extract_text_from_file
from services.gemini_service import GeminiResumeAgent

router = APIRouter(prefix="/api/resume", tags=["Resume"])

@router.get("/templates", response_model=List[TemplateConfigModel])
async def list_templates():
    # Hardcoded templates as requested for the gallery
    return [
        TemplateConfigModel(
            id="minimal",
            name="The Minimalist",
            thumbnail="/thumbnails/minimal.png",
            layout="single-column",
            colorScheme=["#000000", "#ffffff"],
            fontPair="Inter / Roboto",
            category="Minimalist"
        ),
        TemplateConfigModel(
            id="modern",
            name="The Modern",
            thumbnail="/thumbnails/modern.png",
            layout="two-column",
            colorScheme=["#4f46e5", "#ffffff"],
            fontPair="Montserrat / Open Sans",
            category="Modern"
        ),
        TemplateConfigModel(
            id="ats-friendly",
            name="ATS Optimized",
            thumbnail="/thumbnails/ats.png",
            layout="single-column",
            colorScheme=["#000000", "#ffffff"],
            fontPair="Arial / Times New Roman",
            category="ATS-Friendly"
        ),
        TemplateConfigModel(
            id="executive",
            name="The Executive",
            thumbnail="/thumbnails/executive.png",
            layout="two-column",
            colorScheme=["#1e3a8a", "#ffffff"],
            fontPair="Georgia / Helvetica",
            category="Corporate"
        ),
        TemplateConfigModel(
            id="academic",
            name="The Academic",
            thumbnail="/thumbnails/academic.png",
            layout="single-column",
            colorScheme=["#581c87", "#ffffff"],
            fontPair="Merriweather / Lato",
            category="Academic"
        ),
        TemplateConfigModel(
            id="tech",
            name="The Tech",
            thumbnail="/thumbnails/tech.png",
            layout="two-column",
            colorScheme=["#0f172a", "#38bdf8"],
            fontPair="Fira Code / Roboto",
            category="Tech"
        ),
        TemplateConfigModel(
            id="glassmorphism",
            name="The Glassmorphism",
            thumbnail="/thumbnails/glass.png",
            layout="two-column",
            colorScheme=["#a855f7", "#3b82f6"],
            fontPair="Outfit / Inter",
            category="Creative"
        ),
        TemplateConfigModel(
            id="portfolio",
            name="Creative Portfolio",
            thumbnail="/thumbnails/portfolio.png",
            layout="stacked",
            colorScheme=["#f43f5e", "#fbbf24"],
            fontPair="Sora / Montserrat",
            category="Creative"
        ),
        TemplateConfigModel(
            id="timeline",
            name="The Timeline",
            thumbnail="/thumbnails/timeline.png",
            layout="timeline",
            colorScheme=["#0f172a", "#10b981"],
            fontPair="DM Sans / Inter",
            category="Corporate"
        ),
        TemplateConfigModel(
            id="compact",
            name="Compact One-Page",
            thumbnail="/thumbnails/compact.png",
            layout="two-column-dense",
            colorScheme=["#1f2937", "#6b7280"],
            fontPair="Roboto / Open Sans",
            category="ATS-Friendly"
        ),
        TemplateConfigModel(
            id="newspaper",
            name="The Newspaper",
            thumbnail="/thumbnails/newspaper.png",
            layout="multi-column",
            colorScheme=["#111111", "#444444"],
            fontPair="Playfair Display / Crimson Text",
            category="Minimalist"
        ),
        TemplateConfigModel(
            id="skill-based",
            name="Skill Dashboard",
            thumbnail="/thumbnails/skills.png",
            layout="grid-first",
            colorScheme=["#6366f1", "#06b6d4"],
            fontPair="Plus Jakarta Sans / Inter",
            category="Tech"
        ),
        TemplateConfigModel(
            id="contemporary",
            name="Contemporary",
            thumbnail="/thumbnails/contemporary.png",
            layout="structured",
            colorScheme=["#2563eb", "#111827"],
            fontPair="Montserrat / Inter",
            category="Minimalist"
        ),
        TemplateConfigModel(
            id="essential",
            name="Essential",
            thumbnail="/thumbnails/essential.png",
            layout="corporate",
            colorScheme=["#111827", "#334155"],
            fontPair="Roboto / Open Sans",
            category="Corporate"
        ),
        TemplateConfigModel(
            id="polished",
            name="Polished",
            thumbnail="/thumbnails/polished.png",
            layout="executive",
            colorScheme=["#111827", "#1e293b"],
            fontPair="Playfair Display / Inter",
            category="Corporate"
        ),
        TemplateConfigModel(
            id="current",
            name="Current",
            thumbnail="/thumbnails/current.png",
            layout="tech-modern",
            colorScheme=["#1e293b", "#ffffff"],
            fontPair="Fira Code / Roboto",
            category="Tech"
        ),
        TemplateConfigModel(
            id="elegant",
            name="Elegant",
            thumbnail="/thumbnails/elegant.png",
            layout="premium",
            colorScheme=["#111827", "#1e293b"],
            fontPair="Georgia / Inter",
            category="Corporate"
        ),
        TemplateConfigModel(
            id="indigo",
            name="Indigo",
            thumbnail="/thumbnails/indigo.png",
            layout="sidebar",
            colorScheme=["#4f46e5", "#0f172a"],
            fontPair="Outfit / Inter",
            category="Creative"
        ),
        TemplateConfigModel(
            id="crisp",
            name="Crisp",
            thumbnail="/thumbnails/crisp.png",
            layout="sharp-modern",
            colorScheme=["#0f172a", "#64748b"],
            fontPair="Inter / Roboto Mono",
            category="Minimalist"
        ),
        TemplateConfigModel(
            id="professional",
            name="Professional",
            thumbnail="/thumbnails/professional.png",
            layout="corporate-bold",
            colorScheme=["#0f172a", "#1e3a8a"],
            fontPair="Helvetica / Arial",
            category="Corporate"
        ),
        TemplateConfigModel(
            id="avant-garde",
            name="Avant-Garde",
            thumbnail="/thumbnails/avant-garde.png",
            layout="creative-bold",
            colorScheme=["#000000", "#f1f5f9"],
            fontPair="Montserrat-Black / Inter",
            category="Creative"
        ),
        TemplateConfigModel(
            id="creative",
            name="Creative",
            thumbnail="/thumbnails/creative.png",
            layout="dynamic",
            colorScheme=["#ec4899", "#0f172a"],
            fontPair="Sora / Montserrat",
            category="Creative"
        ),
        TemplateConfigModel(
            id="iconic",
            name="Iconic",
            thumbnail="/thumbnails/iconic.png",
            layout="branded",
            colorScheme=["#111827", "#ffffff"],
            fontPair="Outfit / Inter",
            category="Creative"
        )
    ]

@router.get("/{id}", response_model=ResumeDataModel)
async def get_resume(id: str, session: Session = Depends(get_session)):
    resume = session.get(ResumeDataModel, id)
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    return resume

@router.post("/upload")
async def upload_resume(file: UploadFile = File(...)):
    try:
        content = await file.read()
        print(f"Uploaded file: {file.filename}, size: {len(content)} bytes", flush=True)
        text = extract_text_from_file(content, file.filename)
        print(f"Extracted text length: {len(text) if text else 0}", flush=True)
        if not text:
            raise HTTPException(status_code=400, detail="Could not extract readable text. Please ensure you are uploading a text-based PDF or DOCX, and not a scanned image.")
            
        agent = GeminiResumeAgent()
        parsed_data = agent.parse_resume(text)
        
        if not parsed_data:
            raise HTTPException(status_code=500, detail="Failed to parse resume content.")
            
        if "error" in parsed_data:
            raise HTTPException(status_code=500, detail=parsed_data["error"])
            
        return parsed_data
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")

@router.post("", response_model=ResumeDataModel)
async def create_resume(resume: ResumeDataModel, session: Session = Depends(get_session)):
    session.add(resume)
    session.commit()
    session.refresh(resume)
    return resume

@router.put("/{id}", response_model=ResumeDataModel)
async def update_resume(id: str, resume_update: ResumeDataModel, session: Session = Depends(get_session)):
    db_resume = session.get(ResumeDataModel, id)
    if not db_resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    
    resume_data = resume_update.dict(exclude_unset=True)
    for key, value in resume_data.items():
        setattr(db_resume, key, value)
    
    session.add(db_resume)
    session.commit()
    session.refresh(db_resume)
    return db_resume

@router.delete("/{id}")
async def delete_resume(id: str, session: Session = Depends(get_session)):
    resume = session.get(ResumeDataModel, id)
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    session.delete(resume)
    session.commit()
    return {"ok": True}
