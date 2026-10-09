# Task Management Application

A full-stack Task Management Application built with **Django REST Framework, React.js, and MySQL**. This project was developed as a technical assignment and provides REST APIs and a responsive interface for creating, managing, filtering, and tracking tasks.

## Features

- **Dashboard:** Displays total tasks and counts by status.
- **Task management:** Create, view, edit, and delete tasks.
- **Task status:** Track tasks as Pending, In Progress, or Completed.
- **Task details:** Store a title, optional description, status, and optional due date.
- **Filtering and search:** Filter tasks by status and search by title or description.
- **Validation and error handling:** Display validation errors and success or failure notifications.
- **Responsive interface:** Supports desktop, tablet, and mobile screen sizes.

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

### Tools

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

*The directory listing above illustrates the expected layout; retain any additional configuration and files already present in your project.*

## Prerequisites

Install the following before running the application:

- Python
- Node.js and npm
- MySQL Server
- Git

## Database Setup

1. Start your MySQL server.

2. Log in to MySQL:

   ```powershell
   & "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p
   ```

3. Create the application database if it does not already exist:

   ```sql
   CREATE DATABASE IF NOT EXISTS task_management
   CHARACTER SET utf8mb4
   COLLATE utf8mb4_unicode_ci;
   ```

4. Exit the MySQL console:

   ```sql
   exit
   ```

5. Create the backend environment file from `.env.example` if necessary, and configure `backend/.env` with your local database credentials.

   Example configuration:

   ```env
   SECRET_KEY=replace_with_a_local_secret_key
   DEBUG=True
   ALLOWED_HOSTS=localhost,127.0.0.1

   DB_NAME=task_management
   DB_USER=root
   DB_PASSWORD=replace_with_your_local_mysql_password
   DB_HOST=127.0.0.1
   DB_PORT=3306
   ```

   **Never commit your real `.env` file, database password, or production secrets to GitHub.**

## Installation and Setup

### 1. Configure the backend

Open PowerShell in the project root:

```powershell
cd D:\task-management\backend
```

Activate the existing virtual environment:

```powershell
.\venv\Scripts\Activate.ps1
```

If PowerShell blocks activation, you can run the virtual environment's Python executable directly:

```powershell
.\venv\Scripts\python.exe -m pip install -r requirements.txt
```

Run database migrations:

```powershell
.\venv\Scripts\python.exe manage.py migrate
```

Check the Django configuration:

```powershell
.\venv\Scripts\python.exe manage.py check
```

### 2. Configure the frontend

Open another PowerShell terminal:

```powershell
cd D:\task-management\frontend
npm install
npm run build
```

If your project uses a custom build script or a different frontend output directory, follow the configuration in `package.json` and `vite.config.js`.

## Running the Application

### Option 1: Single-server setup

From the project root, run:

```powershell
cd D:\task-management
.\run-app.ps1
```

If the script is configured to build the React frontend and launch Django, open:

**[http://127.0.0.1:8000/](http://127.0.0.1:8000/)**

### Option 2: Start Django manually

From the project root:

```powershell
cd D:\task-management\backend
.\venv\Scripts\python.exe manage.py runserver 127.0.0.1:8000
```

Open **[http://127.0.0.1:8000/](http://127.0.0.1:8000/)**.

## REST API Documentation

Base URL:

```text
http://127.0.0.1:8000/api/
```

| Method | Endpoint           | Description                                 |
| ------ | ------------------ | ------------------------------------------- |
| GET    | `/api/tasks/`      | Retrieve all tasks                          |
| POST   | `/api/tasks/`      | Create a task                               |
| GET    | `/api/tasks/{id}/` | Retrieve a specific task                    |
| PUT    | `/api/tasks/{id}/` | Update a task                               |
| PATCH  | `/api/tasks/{id}/` | Partially update a task, such as its status |
| DELETE | `/api/tasks/{id}/` | Delete a task                               |

### Task fields

| Field         | Description                        |
| ------------- | ---------------------------------- |
| `title`       | Required task title                |
| `description` | Optional task description          |
| `status`      | Pending, In Progress, or Completed |
| `due_date`    | Optional due date                  |

### Common HTTP status codes

- `200 OK` — Request completed successfully.
- `201 Created` — Task created successfully.
- `204 No Content` — Task deleted successfully.
- `400 Bad Request` — Invalid input or validation failure.
- `404 Not Found` — Task does not exist.
- `500 Internal Server Error` — Unexpected server error.

Actual response codes depend on the implemented API behavior.

## Running Tests

Run the backend tests:

```powershell
cd D:\task-management\backend
.\venv\Scripts\python.exe manage.py test tasks
```

Build the frontend:

```powershell
cd D:\task-management\frontend
npm run build
```

## Version Control

Before committing, ensure that `.env` files, virtual environments, `node_modules`, and generated files containing secrets are excluded from Git.

Example Git commands:

```bash
git add README.md
git commit -m "Improve project documentation"
git push origin main
```

##

