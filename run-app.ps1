# ==============================================================================
# Single Server Workflow Script for Task Management Application
# Builds React frontend into backend/frontend_dist and starts Django on port 8000
# ==============================================================================

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " [1/2] Building React Frontend Assets (Vite)..." -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

npm.cmd --prefix frontend run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "`n[ERROR] Frontend build failed! Aborting server start." -ForegroundColor Red
    exit $LASTEXITCODE
}

Write-Host "`n==========================================================" -ForegroundColor Green
Write-Host " [2/2] Starting Single-Server Django Backend & React App..." -ForegroundColor Green
Write-Host " App URL: http://127.0.0.1:8000/" -ForegroundColor Yellow
Write-Host " API URL: http://127.0.0.1:8000/api/tasks/" -ForegroundColor Yellow
Write-Host "==========================================================`n" -ForegroundColor Green

$env:USE_SQLITE="True"
.\backend\venv\Scripts\python.exe backend\manage.py runserver 127.0.0.1:8000
