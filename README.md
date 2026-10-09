# Task Management Application

A modern full-stack **Task Management Application** built as part of the Codeingil Technical Assignment. The application features a robust **Django REST Framework** backend connected to a **MySQL** database, paired with a sleek, responsive **React.js (Vite)** single-page application served from a single unified Django development server.

---

## Single-Server Architecture

Django on port `8000` serves both:
1. **React SPA Dashboard** at `http://127.0.0.1:8000/` (and static assets at `/assets/...`).
2. **REST API Endpoints** at `http://127.0.0.1:8000/api/tasks/`.

---

## Technology Stack

### Backend
- **Language**: Python 3.14
- **Framework**: Django 5.1 & Django REST Framework (DRF)
- **Database**: MySQL Server 8.0 (with `PyMySQL` driver & Django ORM)
- **Middleware**: `django-cors-headers`
- **Environment Management**: `python-dotenv`

### Frontend
- **Framework**: React.js 19 (via Vite)
- **Language**: JavaScript (ES6+)
- **Styling**: Modern CSS with Glassmorphism, CSS Variables, & Custom Animations
- **HTTP Client**: Axios (configured with relative same-origin API URLs `/api/tasks/`)

### Development & Tools
- **Operating System**: Windows
- **Version Control**: Git & GitHub

---

## Features

- **Dashboard Metrics**: Summary cards displaying Total Tasks, Pending, In Progress, and Completed task counts.
- **Full CRUD Operations**:
  - **Create**: Add new tasks with validation (title required, description, status, due date).
  - **Read**: Fetch and display all persisted tasks from Django REST API.
  - **Update**: Full edit via modal form (PUT) or quick inline status toggle (PATCH).
  - **Delete**: Remove tasks with double confirmation modal dialog.
- **Filtering & Search**:
  - Filter tasks by status: *All Tasks*, *Pending*, *In Progress*, *Completed*.
  - Real-time client-side search across task titles and descriptions.
- **User Experience**:
  - Responsive design for mobile, tablet, and desktop views.
  - Toast notification banners for API success/error messages.
  - Interactive modal dialogs with backdrop blur.
  - Empty states and animated loading spinners.

---

## Quick Start Workflow (Single Command)

We provide a convenient PowerShell script `run-app.ps1` in the root directory that automatically builds the React frontend assets into `backend/frontend_dist` and launches the Django server on port 8000:

```powershell
cd d:\task-management
.\run-app.ps1
```

Open your web browser at **`http://127.0.0.1:8000/`**.

---

## Rebuilding Frontend After Code Changes

Whenever you modify any React component in `frontend/src/`:

1. Open PowerShell in `frontend/`:
   ```powershell
   cd d:\task-management\frontend
   npm.cmd run build
   ```
2. Vite will update `backend/frontend_dist/` automatically. Refresh your browser at `http://127.0.0.1:8000/`.

*(Optional: If you prefer hot-module reloading during heavy frontend UI development, you can still run `npm.cmd run dev` in `frontend/` to use Vite's dev server on port 5173).*

---

## Database Setup (MySQL)

1. Open PowerShell or MySQL Workbench and log into your MySQL instance:
   ```powershell
   & "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p
   ```
2. Create the target database:
   ```sql
   CREATE DATABASE IF NOT EXISTS task_management;
   ```
3. Update `DB_PASSWORD` in `backend/.env` with your local MySQL root password:
   ```env
   DB_NAME=task_management
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_HOST=127.0.0.1
   DB_PORT=3306
   ```

---

## Backend & Test Instructions

Execute in Windows PowerShell inside `backend/`:

1. **Run Backend Unit Tests**:
   ```powershell
   cd d:\task-management\backend
   .\venv\Scripts\python.exe manage.py test tasks
   ```

2. **Run Django System Check**:
   ```powershell
   .\venv\Scripts\python.exe manage.py check
   ```

3. **Start Django Server Manually**:
   ```powershell
   .\venv\Scripts\python.exe manage.py runserver 127.0.0.1:8000
   ```

---

## REST API Endpoint Documentation

Base URL: `http://127.0.0.1:8000/api/`

| HTTP Method | Endpoint | Action | Success Code | Error Code |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/tasks/` | List all tasks | `200 OK` | `500 Server Error` |
| `POST` | `/api/tasks/` | Create a new task | `201 Created` | `400 Bad Request` |
| `GET` | `/api/tasks/{id}/` | Retrieve single task | `200 OK` | `404 Not Found` |
| `PUT` | `/api/tasks/{id}/` | Full update task | `200 OK` | `400 Bad Request`, `404 Not Found` |
| `PATCH` | `/api/tasks/{id}/` | Partial update (e.g. status) | `200 OK` | `400 Bad Request`, `404 Not Found` |
| `DELETE` | `/api/tasks/{id}/` | Delete task | `204 No Content` | `404 Not Found` |
