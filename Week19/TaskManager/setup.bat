@echo off
REM TaskFlow Installation & Setup Script for Windows
REM This script installs dependencies and sets up the project

echo.
echo 🎯 TaskFlow - Task Management Application Setup
echo ================================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    exit /b 1
)

echo ✅ Node.js is installed
node --version
echo.

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    exit /b 1
)

echo ✅ Dependencies installed
echo.

REM Create .env.local if it doesn't exist
if not exist .env.local (
    echo 📝 Creating .env.local file...
    copy .env.example .env.local
    echo ✅ .env.local created (use default values or customize)
) else (
    echo ✅ .env.local already exists
)

echo.

REM Setup database
echo 🗄️  Setting up database...
call npm run db:push

if %errorlevel% neq 0 (
    echo ❌ Failed to setup database
    exit /b 1
)

echo ✅ Database setup complete
echo.

REM Seed database
set /p seed="Do you want to seed sample data? (y/n): "
if /i "%seed%"=="y" (
    echo 🌱 Seeding database with sample data...
    call npm run seed
    
    if %errorlevel% equ 0 (
        echo ✅ Database seeded
        echo.
        echo 🔑 Test Credentials:
        echo    Email: user@example.com
        echo    Password: password123
    )
)

echo.
echo 🎉 Setup complete!
echo.
echo 📖 Quick Start:
echo    1. Start dev server: npm run dev
echo    2. Open: http://localhost:3000
echo    3. Register or login with test credentials
echo.
echo 📚 Available Commands:
echo    npm run dev       - Start development server
echo    npm run build     - Build for production
echo    npm start         - Start production server
echo    npm run db:studio - Open Prisma Studio
echo    npm run db:push   - Push schema to database
echo.
echo Happy coding! 🚀
pause
