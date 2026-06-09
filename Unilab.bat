@echo off

echo Iniciando Backend...
start "Backend" cmd /k "cd /d "C:\Users\Laboratorio Quimica\Desktop\quimica\backend" && call venv\Scripts\activate.bat && python -m uvicorn main:app --reload"

timeout /t 5 /nobreak >nul

echo Iniciando Frontend...
start "Frontend" cmd /k "cd /d "C:\Users\Laboratorio Quimica\Desktop\quimica\frontend" && npm run dev"

timeout /t 10 /nobreak >nul

start http://localhost:5173