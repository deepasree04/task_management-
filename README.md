# Task Management Application

A full-stack Task Management Application built with **Django REST Framework, React.js, and MySQL**. It provides a responsive dashboard and REST APIs for creating, viewing, updating, filtering, searching, and deleting tasks.

## Features

- **Dashboard metrics:** View total tasks and counts by status.
- **Create tasks:** Add a task with a required title and optional description and due date.
- **View tasks:** Display tasks in a responsive layout.
- **Edit tasks:** Update task details.
- **Delete tasks:** Remove tasks with confirmation.
- **Update status:** Track tasks as Pending, In Progress, or Completed.
- **Filter and search:** Filter by status and search task titles and descriptions.
- **Validation and notifications:** Display success messages, validation errors, and API error messages.
- **Responsive UI:** Designed for desktop, tablet, and mobile screens.

## Technology Stack

### Backend
- Python
- Django
- Django REST Framework
- MySQL
- PyMySQL
- python-dotenv

### Frontend
- React.js
- Vite
- JavaScript (ES6+)
- Axios
- CSS

### Development Tools
- Git and GitHub
- Visual Studio Code

## Project Structure

```text
task-management/
├── backend/
│   ├── config/
│   ├── tasks/
│   ├── manage.py
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── run-app.ps1
├── README.md
└── .gitignore
```

This structure highlights the main project files. Other configuration files and directories may also be present.

## Prerequisites

Install the following:

- Python
- Node.js and npm
- MySQL Server
- Git

## Database Setup

1. Start the MySQL Server service.

2. Open PowerShell and connect to MySQL:

   ```powershell
   & "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p
   ```

3. Create the database if it does not already exist:

   ```sql
   CREATE DATABASE IF NOT EXISTS task_management
   CHARACTER SET utf8mb4
   COLLATE utf8mb4_unicode_ci;
   ```

4. Exit the MySQL console:

   ```sql
   exit
   ```

5. Create `backend/.env` using `.env.example` as a reference, if necessary. Configure the environment variables for your local setup:

   ```env
   SECRET_KEY=replace_with_a_local_secret_key
   DEBUG=True
   ALLOWED_HOSTS=localhost,127.0.0.1

   DB_NAME=task_management
   DB_USER=root
   DB_PASSWORD=your_local_mysql_password
   DB_HOST=127.0.0.1
   DB_PORT=3306
   ```

   Replace the example values with your local configuration. Never commit your real `.env` file, database password, or production secrets to GitHub.

## Installation and Setup

### 1. Configure the backend

Open PowerShell and navigate to the backend directory:

```powershell
cd D:\task-management\backend
```

Install backend dependencies using the existing virtual environment:

```powershell
.\venv\Scripts\python.exe -m pip install -r requirements.txt
```

Apply database migrations:

```powershell
.\venv\Scripts\python.exe manage.py migrate
```

Check the Django configuration:

```powershell
.\venv\Scripts\python.exe manage.py check
```

### 2. Build the frontend

Open a separate PowerShell terminal:

```powershell
cd D:\task-management\frontend
npm install
npm run build
```

The frontend build output should match the directory configured in the project, including the expected Django static-file integration.

## Running the Application

### Option 1: Single-server startup

From the project root, run:

```powershell
cd D:\task-management
.\run-app.ps1
```

If the script is configured to build the frontend and start Django, open:

**http://127.0.0.1:8000/**

### Option 2: Start Django manually

From the backend directory:

```powershell
cd D:\task-management\backend
.\venv\Scripts\python.exe manage.py runserver 127.0.0.1:8000
```

Open **http://127.0.0.1:8000/** in your browser.

## REST API Documentation

**Base URL:** `http://127.0.0.1:8000/api/`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tasks/` | Retrieve all tasks |
| POST | `/api/tasks/` | Create a task |
| GET | `/api/tasks/{id}/` | Retrieve a specific task |
| PUT | `/api/tasks/{id}/` | Update a task |
| PATCH | `/api/tasks/{id}/` | Partially update a task, such as its status |
| DELETE | `/api/tasks/{id}/` | Delete a task |

### Task Fields

| Field | Description |
|---|---|
| `title` | Required task title |
| `description` | Optional task description |
| `status` | Pending, In Progress, or Completed |
| `due_date` | Optional due date |

### HTTP Status Codes

- `200 OK` — Request completed successfully.
- `201 Created` — Task created successfully.
- `204 No Content` — Task deleted successfully.
- `400 Bad Request` — Invalid input or validation failure.
- `404 Not Found` — Requested task does not exist.
- `500 Internal Server Error` — Unexpected server error.

Actual response codes depend on the implemented API behavior.

## Testing

Run the backend tests:

```powershell
cd D:\task-management\backend
.\venv\Scripts\python.exe manage.py test tasks
```

Check the backend configuration:

```powershell
.\venv\Scripts\python.exe manage.py check
```

Build the frontend:

```powershell
cd D:\task-management\frontend
npm run build
```

## Git and GitHub

Before pushing the project, ensure that sensitive files and generated dependency folders are excluded from version control.

Common files and directories to exclude include:

- `.env` and other files containing secrets
- `venv/`
- `node_modules/`
- Python cache files
- Local database files

Commit and push README changes:

```bash
git add README.md
git commit -m "Improve project documentation"
git push origin main
```

## Author

**Deepasree Somasundharam**
