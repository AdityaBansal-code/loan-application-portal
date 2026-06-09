# Vitto Loan Portal

A full-stack loan application management system. Applicants submit loan requests in their preferred language; admins review, approve, or reject them from a centralized dashboard.

---

## Features

**Applicant side**
- Loan application form with real-time validation
- Multi-language support: English, Hindi, Tamil, Telugu, Marathi
- Unique reference ID returned on successful submission

**Admin dashboard**
- Live stats: total applications, total loan amount, pending / approved / rejected counts
- Search by name or mobile number; filter by status
- One-click approve / reject for pending applications

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS 4, React Router 7 |
| Backend | Node.js, Express 5, TypeScript |
| Database | PostgreSQL |
| HTTP client | Axios |
| Icons | Lucide React |

---

## Project Structure

```
loan-application-portal/
├── backend/
│   └── src/
│       ├── server.ts                  # Entry point (port 5000)
│       ├── app.ts                     # Express app, CORS, routes
│       ├── config/db.ts               # PostgreSQL connection pool
│       ├── routes/applicationRoutes.ts
│       ├── controllers/applicationController.ts
│       ├── middleware/validateApplication.ts
│       └── types/application.ts
└── frontend/
    └── src/
        ├── main.tsx / App.tsx         # Entry point and routes
        ├── pages/
        │   ├── ApplyPage.tsx          # Public application form
        │   └── DashboardPage.tsx      # Admin dashboard
        ├── components/                # Navbar, table, form, badges, stats
        ├── services/api.ts            # Axios instance
        └── types/
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A PostgreSQL database (local or remote)

### 1. Clone the repo

```bash
git clone <repo-url>
cd loan-application-portal
```

### 2. Configure environment variables

**`backend/.env`**
```env
DATABASE_URL=your_postgres_connection_string
PORT=5000
```

**`frontend/.env`**
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Set up the database

Create the `applications` table in your PostgreSQL database:

```sql
CREATE TABLE applications (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  mobile      CHAR(10) NOT NULL,
  amount      NUMERIC NOT NULL,
  purpose     TEXT NOT NULL,
  language    TEXT NOT NULL,
  status      TEXT NOT NULL DEFAULT 'pending',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### 4. Install dependencies and run

```bash
# Backend
cd backend
npm install
npm run dev       # runs on http://localhost:5000

# Frontend (separate terminal)
cd frontend
npm install
npm run dev       # runs on http://localhost:5173
```

---

## API Reference

Base path: `/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Health check |
| `POST` | `/applications` | Submit a new loan application |
| `GET` | `/applications` | List applications (optional `?status=pending\|approved\|rejected`) |
| `PATCH` | `/applications/:id/status` | Approve or reject an application |
| `GET` | `/summary` | Dashboard statistics |

### POST `/applications` — request body

```json
{
  "name": "Ravi Kumar",
  "mobile": "9876543210",
  "amount": 50000,
  "purpose": "Home renovation",
  "language": "Hindi"
}
```

### PATCH `/applications/:id/status` — request body

```json
{ "status": "approved" }
```

---

## Available Scripts

### Backend

| Command | Description |
|---------|-------------|
| `npm run dev` | Start with hot-reload (tsx watch) |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run compiled server |

### Frontend

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Type-check + production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## Validation Rules

| Field | Rule |
|-------|------|
| `name` | Required, non-empty |
| `mobile` | Required, exactly 10 digits |
| `amount` | Required, must be > 0 |
| `purpose` | Required, non-empty |
| `language` | One of: English, Hindi, Tamil, Telugu, Marathi |

Validation is enforced on both client and server.