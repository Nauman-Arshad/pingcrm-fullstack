# 🧩 PingCRM – Fullstack Rebuild

This is a fullstack rebuild of the **PingCRM** demo application using modern technologies with clean architecture and CRUD functionality.

---

## 🛠️ Tech Stack

**Frontend**

- React + TypeScript
- Tailwind CSS
- Axios

**Backend**

- FastAPI (Python)
- PostgreSQL
- SQLAlchemy + Pydantic

**Infrastructure**

- Supabase (PostgreSQL hosting)
- Vercel (frontend deployment)
- Render (backend deployment)

---

## 🚀 Live Demo

| Platform    | URL                                                                                          |
| ----------- | -------------------------------------------------------------------------------------------- |
| Frontend    | [https://pingcrm-frontend.vercel.app/contacts](https://pingcrm-frontend.vercel.app/contacts) |
| Backend API | [https://pingcrm-backend.onrender.com](https://pingcrm-backend.onrender.com)                 |

> 🔌 Database is connected via `.env` using Supabase/Neon connection string.

---

## 📦 Project Structure

```
/pingcrm
├── frontend   # React + TypeScript + Tailwind
├── backend    # FastAPI + SQLAlchemy + Pydantic
└── README.md  # You're here!
```

---

## 🌟 Features

### ✅ Contact Management

- List, create, edit, and delete contacts
- Each contact has: **name**, **phone**, **city**, and **associated company**

### ✅ Company Management

- List, create, edit, and delete companies
- Contacts can be associated with companies

### ✅ Search & Filtering

- Filter contacts by **name**
- Filter contacts by **company**
- Backend query support for combined filtering

---

## 💻 Running the Project Locally

### 🖥 Frontend Setup

```bash
cd frontend
npm install
npm run dev
# Visit: http://localhost:5173
```

### ⚙️ Backend Setup

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
# Visit: http://localhost:8000/docs
```

### 🗃️ Database Setup

- PostgreSQL database is hosted on **Supabase**
- Add your connection string in `backend/.env`:

```env
DATABASE_URL=postgresql://username:password@host:port/dbname
```

---

## ✅ Completion Status

| Feature                           | Status           |
| --------------------------------- | ---------------- |
| Contact CRUD                      | ✅ Completed     |
| Company CRUD                      | ✅ Completed     |
| Associate contacts with companies | ✅ Completed     |
| Search/filter by name or company  | ✅ Completed     |
| Responsive UI with Tailwind       | ✅ Completed     |
| API Validation/Error handling     | ✅ Completed     |
| Design polish                     | ⚠️ Basic styling |

---

## ⏱️ Time Spent

**~3 to 3.5 hours** across:

- Setting up architecture
- Building CRUD functionality
- Styling and UI structure
- Debugging & testing

---

## 🤖 AI Tools Used

| Tool    | Purpose                                  |
| ------- | ---------------------------------------- |
| ChatGPT | FastAPI and schema scaffolding, UI logic |

---
