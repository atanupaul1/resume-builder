# backend/routers/export.py
from fastapi import APIRouter, Response
from fastapi.responses import StreamingResponse
from models import ResumeDataModel
from services.pdf_service import PDFService
import io

router = APIRouter(prefix="/api/export", tags=["Export"])
pdf_service = PDFService()

@router.post("/pdf")
async def export_pdf(resume: dict): # Using dict to allow flexible JSON from frontend
    pdf_bytes = pdf_service.render_resume_to_pdf(resume)
    
    return StreamingResponse(
        io.BytesIO(pdf_bytes),
        media_type="application/pdf",
        headers={
            "Content-Disposition": 'attachment; filename="resume.pdf"'
        }
    )
