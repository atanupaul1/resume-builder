## Frontend

Next.js app for landing page, template gallery, builder, and export flow.

## Setup

1. Copy `.env.example` to `.env.local`
2. Set `NEXT_PUBLIC_API_URL` to your backend URL
3. Install deps and run dev server

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Notes

- Builder draft saves locally in browser storage
- Template selection passes through local draft state
- PDF export depends on backend export endpoint
- Keep `.env.local` out of version control

## Main Routes

- `/`
- `/templates`
- `/builder`
- `/export`

## Backend Dependency

Frontend expects FastAPI backend running separately. Default local API URL: `http://localhost:8000`.
