# Task Management Application

A modern full-stack **Task Management Application** built as part of the Codeingil Technical Assignment. The application features a robust **Django REST Framework** backend connected to a **MySQL** database, paired with a sleek, responsive **React.js (Vite)** dashboard.

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
- **HTTP Client**: Axios

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

## Project Structure

```text
task-management/
├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   ├── .env.example
│   ├── config/
│   │   ├── __init__.py      # PyMySQL initialization
│   │   ├── settings.py      # Django settings (MySQL, CORS, DRF)
│   │   ├── urls.py          # Root URL dispatcher
│   │   ├── wsgi.py
│   │   └── asgi.py
│   └── tasks/
│       ├── models.py        # Task ORM Model
│       ├── serializers.py   # DRF TaskSerializer with validation
│       ├── views.py         # REST API views (GET, POST, PUT, PATCH, DELETE)
│       ├── urls.py          # /api/tasks/ routes
│       └── tests.py         # 9 Automated DRF unit tests
├── frontend/
│   ├── package.json
│   ├── index.html
│   ├── vite.config.js
│   ├── .env.example
│   └── src/
│       ├── components/
│       │   ├── Header.jsx
│       │   ├── StatsCards.jsx
│       │   ├── TaskFilters.jsx
│       │   ├── TaskList.jsx
│       │   ├── TaskItem.jsx
│       │   ├── TaskModal.jsx
│       │   ├── DeleteConfirmModal.jsx
│       │   └── NotificationBanner.jsx
│       ├── services/
│       │   └── taskService.js  # Axios API communication
│       ├── App.jsx
│       ├── main.jsx
│       └── index.css
├── README.md
└── .gitignore
```

---

## Prerequisites

Before running the application on Windows, ensure the following are installed:

1. **Python 3.10+**: Verify via `python --version`
2. **Node.js 18+ & npm**: Verify via `node -v` and `npm.cmd -v`
3. **MySQL Server 8.0**: Verify service status in PowerShell:
   ```powershell
   Get-Service -Name "*mysql*"
   ```
4. **Git**: Verify via `git --version`

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
3. Create the backend `.env` file from `.env.example` inside `backend/`:
   ```powershell
   cd backend
   Copy-Item .env.example .env
   ```
4. Update `DB_PASSWORD` in `backend/.env` with your local MySQL root password:
   ```env
   DB_NAME=task_management
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_HOST=127.0.0.1
   DB_PORT=3306
   ```

---

## Backend Setup & Instructions

All commands must be executed in Windows PowerShell inside the `backend/` folder.

1. **Navigate to backend directory**:
   ```powershell
   cd d:\task-management\backend
   ```

2. **Create Python virtual environment**:
   ```powershell
   python -m venv venv
   ```

3. **Install Python dependencies**:
   ```powershell
   .\venv\Scripts\python.exe -m pip install -r requirements.txt
   ```

4. **Generate and apply Django migrations**:
   ```powershell
   .\venv\Scripts\python.exe manage.py makemigrations tasks
   .\venv\Scripts\python.exe manage.py migrate
   ```

5. **Run Backend Unit Tests**:
   ```powershell
   .\venv\Scripts\python.exe manage.py test tasks
   ```

6. **Start Django Development Server**:
   ```powershell
   .\venv\Scripts\python.exe manage.py runserver 8000
   ```
   The backend API will be available at `http://127.0.0.1:8000/api/tasks/`.

---

## Frontend Setup & Instructions

Open a **separate** Windows PowerShell window for the frontend commands.

1. **Navigate to frontend directory**:
   ```powershell
   cd d:\task-management\frontend
   ```

2. **Install Node dependencies**:
   ```powershell
   npm.cmd install
   ```

3. **Create environment file**:
   ```powershell
   Copy-Item .env.example .env
   ```

4. **Test Production Build**:
   ```powershell
   npm.cmd run build
   ```

5. **Start Vite Development Server**:
   ```powershell
   npm.cmd run dev
   ```
   The React Dashboard will launch at `http://localhost:5173`.

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

### Example Request Bodies

#### 1. POST /api/tasks/ (Create Task)
```json
{
  "title": "Prepare Drag-and-Drop Column Feature",
  "description": "Implement Kanban column view in React frontend.",
  "status": "Pending",
  "due_date": "2026-11-20"
}
```

#### 2. PATCH /api/tasks/1/ (Update Status)
```json
{
  "status": "In Progress"
}
```

### Example Response Format (GET /api/tasks/1/)
```json
{
  "id": 1,
  "title": "Prepare Drag-and-Drop Column Feature",
  "description": "Implement Kanban column view in React frontend.",
  "status": "In Progress",
  "due_date": "2026-11-20",
  "created_at": "2026-10-09T18:30:00.123456Z",
  "updated_at": "2026-10-09T18:35:12.654321Z"
}
```

---

## Common Errors & Troubleshooting

1. **PowerShell Script Execution Policy Error (`npm.ps1 cannot be loaded...`)**:
   - **Fix**: Use `npm.cmd` instead of `npm`, or run `Set-ExecutionPolicy -Scope Process Bypass` in PowerShell.

2. **MySQL Access Denied (`ERROR 1045 (28000)`)**:
   - **Fix**: Ensure your MySQL root password is correctly defined in `backend/.env` under `DB_PASSWORD`.

3. **CORS Error in Browser Console (`Access-Control-Allow-Origin`)**:
   - **Fix**: Verify `CORS_ALLOWED_ORIGINS` in `backend/.env` contains `http://localhost:5173`. `django-cors-headers` is configured in `config/settings.py`.

4. **PyMySQL / MySQLclient module missing**:
   - **Fix**: Ensure you run commands using `.\venv\Scripts\python.exe` inside `backend/`.

---

## GitHub Submission Instructions

To push the repository to GitHub:

1. Create a new GitHub repository named `task-management` on [github.com](https://github.com).
2. Link your local repository to GitHub in PowerShell:
   ```powershell
   cd d:\task-management
   git remote add origin https://github.com/YOUR_USERNAME/task-management.git
   git branch -M main
   git push -u origin main
   ```
3. Verification before pushing:
   - Ensure `.env`, `venv/`, and `node_modules/` are excluded by checking `git status`.
