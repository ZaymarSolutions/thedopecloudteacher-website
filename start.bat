@echo off
echo ========================================
echo The Dope Cloud Teacher - Quick Start
echo ========================================
echo.

echo [1/4] Installing backend dependencies...
cd backend
call npm install
if errorlevel 1 (
    echo ERROR: npm install failed
    pause
    exit /b 1
)

echo.
echo [2/4] Creating .env file...
if not exist .env (
    copy .env.example .env
    echo Created .env file - PLEASE EDIT IT with your Stripe keys!
    pause
) else (
    echo .env already exists
)

echo.
echo [3/4] Initializing database...
call npm run init-db
if errorlevel 1 (
    echo ERROR: Database initialization failed
    pause
    exit /b 1
)

echo.
echo [4/4] Starting backend server...
echo.
echo Backend will start on http://localhost:3000
echo.
echo To serve the frontend, open a new terminal and run:
echo   cd dope-cloud-teacher
echo   python -m http.server 8080
echo.
echo Then open http://localhost:8080 in your browser
echo.
echo Press Ctrl+C to stop the server
echo.
call npm start
