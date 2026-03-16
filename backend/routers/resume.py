# backend/routers/resume.py
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from database import get_session
from models import ResumeDataModel, TemplateConfigModel
from typing import List

router = APIRouter(prefix="/api/resume", tags=["Resume"])

@router.get("/templates", response_model=List[TemplateConfigModel])
async def list_templates():
    # Hardcoded templates as requested for the gallery
    return [
        TemplateConfigModel(
            id="minimal",
            name="Minimalist Professional",
            thumbnail="/thumbnails/minimal.png",
            layout="single-column",
            colorScheme=["#000000", "#ffffff"],
            fontPair="Inter / Roboto"
        ),
        TemplateConfigModel(
            id="modern",
            name="Modern Creative",
            thumbnail="/thumbnails/modern.png",
            layout="two-column",
            colorScheme=["#4f46e5", "#ffffff"],
            fontPair="Montserrat / Open Sans"
        ),
        TemplateConfigModel(
            id="ats-friendly",
            name="ATS Optimized",
            thumbnail="/thumbnails/ats.png",
            layout="single-column",
            colorScheme=["#000000", "#ffffff"],
            fontPair="Arial / Times New Roman"
        )
    ]

@router.get("/{id}", response_model=ResumeDataModel)
async def get_resume(id: str, session: Session = Depends(get_session)):
    resume = session.get(ResumeDataModel, id)
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    return resume

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
