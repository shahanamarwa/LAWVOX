@echo off
title LAWVOX - Constitutional Precedent & Legal Audio Platform
cls
echo ======================================================================
echo    LAWVOX - Constitutional Precedent Research & Legal Audio Platform
echo ======================================================================
echo.
echo Starting local web server on port 3000...
echo.

cd /d "%~dp0\frontend"

:: Open default browser automatically after 2 seconds
start "" cmd /c "timeout /t 2 /nobreak >nul & start http://localhost:3000/dashboard"

:: Run Next.js server
call npm.cmd run dev -- -p 3000

pause
