# backend/routers/export.py
from fastapi import APIRouter, Response, HTTPException
from services.pdf_service import PDFService

router = APIRouter(prefix="/api/export", tags=["Export"])
pdf_service = PDFService()

@router.post("/pdf")
async def export_pdf(payload: dict): # Payload: {"html": "..."}
    html = payload.get("html", "")
    if not html.strip():
        raise HTTPException(status_code=400, detail="Missing HTML payload for PDF export.")

    try:
        pdf_bytes = await pdf_service.render_resume_to_pdf(html)
        return Response(
            content=pdf_bytes,
            media_type="application/pdf",
            headers={
                "Content-Disposition": 'attachment; filename="resume.pdf"'
            }
        )
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"PDF export failed: {exc}")
