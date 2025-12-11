@echo off
REM Docker Setup Script for Node.js Application (Windows)
REM This script helps you set up and run your application with Docker

setlocal enabledelayedexpansion

echo.
echo ==========================================
echo Node.js Docker Setup (Windows)
echo ==========================================
echo.

REM Check if Docker is installed
docker --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo ❌ Docker is not installed or not in PATH
    echo Please install Docker Desktop from https://www.docker.com/products/docker-desktop
    echo.
    pause
    exit /b 1
)

echo ✅ Docker is installed

REM Check if Docker daemon is running
docker info >nul 2>&1
if errorlevel 1 (
    echo.
    echo ❌ Docker daemon is not running
    echo Please start Docker Desktop
    echo.
    pause
    exit /b 1
)

echo ✅ Docker daemon is running

REM Check if docker-compose is installed
docker-compose --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker Compose is not installed
    pause
    exit /b 1
)

echo ✅ Docker Compose is installed

REM Create .env file if it doesn't exist
if not exist .env (
    echo.
    echo 📝 Creating .env file from .env.example
    copy .env.example .env
    echo ✅ .env file created. Please update it with your configuration if needed.
    echo.
)

echo.
echo ==========================================
echo Starting Docker Compose...
echo ==========================================
echo.

REM Stop existing containers
echo 🛑 Stopping existing containers (if any)...
docker-compose down --remove-orphans 2>nul || true

REM Build and start containers
echo 🔨 Building and starting containers...
docker-compose up -d --build

echo.
echo ==========================================
echo ✅ Setup Complete!
echo ==========================================
echo.
echo Your application is now running!
echo.
echo 📍 Application URL: http://localhost:4001
echo 📍 Database: localhost:5432
echo.
echo Useful commands:
echo   • View logs:      docker-compose logs -f app
echo   • Stop services:  docker-compose down
echo   • Restart:        docker-compose restart
echo   • View DB logs:   docker-compose logs -f db
echo.
echo ==========================================
echo.
pause
