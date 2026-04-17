from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlmodel import Session, select
from database import get_session
from models import ResumeDataModel, TemplateConfigModel
from typing import List
from utils.file_parser import extract_text_from_file
from services.resume_parser_service import parse_resume_text

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
            id="ats",
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
            id="current",
            name="Current",
            thumbnail="/thumbnails/current.png",
            layout="tech-modern",
            colorScheme=["#1e293b", "#ffffff"],
            fontPair="Fira Code / Roboto",
            category="Tech"
        ),
        TemplateConfigModel(
            id="creative",
            name="Creative",
            thumbnail="/thumbnails/creative.png",
            layout="dynamic",
            colorScheme=["#ec4899", "#0f172a"],
            fontPair="Sora / Montserrat",
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
    import traceback
    try:
        content = await file.read()
        print(f"Uploaded file: {file.filename}, size: {len(content)} bytes", flush=True)
        print(f"File content type: {file.content_type}", flush=True)

        text = extract_text_from_file(content, file.filename)
        print(f"Extracted text length: {len(text) if text else 0}", flush=True)

        if not text or not text.strip():
            raise HTTPException(status_code=400, detail="No readable text found in uploaded file.")

        parsed = parse_resume_text(text)
        if not parsed.get("personalInfo") and not parsed.get("summary"):
            raise HTTPException(status_code=400, detail="Could not parse resume content from uploaded file.")
        return parsed
    except HTTPException:
        raise
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e) or "No readable text found in uploaded file.",
        )
    except Exception as e:
        print(f"UPLOAD ERROR TRACEBACK:\n{traceback.format_exc()}", flush=True)
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
