# Resume Builder

Resume builder with Next.js frontend and FastAPI backend.

## Structure

- `frontend/`: Next.js 16 app for landing page, template gallery, builder, and export flow
- `backend/`: FastAPI API for resume upload, template metadata, persistence, and PDF export
- `prd.md`: product direction and roadmap

## Prerequisites

- Node.js 20+
- Python 3.11+
## Environment Setup

Frontend:

1. Copy `frontend/.env.example` to `frontend/.env.local`
2. Set `NEXT_PUBLIC_API_URL` if backend not running on `http://localhost:8000`

Backend:

1. Copy `backend/.env.example` to `backend/.env`
2. Keep `DATABASE_URL` as SQLite for local development unless you want another database

Important:

- Existing `.env` and `.env.local` files are intentionally ignored
- Do not commit API keys or local database files
- If secrets were ever shared, rotate them

## Run Locally

Backend:

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Open:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8000`
- Backend health check: `http://localhost:8000/`

## Current Core Flow

1. Pick template from gallery
2. Fill sections in builder
3. Import existing resume from PDF/DOCX/TXT
4. Let builder autosave draft locally
5. Export finished resume as PDF

## Main API Routes

- `GET /api/resume/templates`
- `POST /api/resume/upload`
- `POST /api/resume`
- `PUT /api/resume/{id}`
- `DELETE /api/resume/{id}`
- `POST /api/export/pdf`

## Known Gaps

- Full backend resume versioning not finished
- Full test coverage and deployment setup still in progress
