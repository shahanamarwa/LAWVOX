@echo off
title LAWVOX - Permanent Backend Server
color 0A

echo ================================================================
echo   LAWVOX PRO - Constitutional Precedent & Legal Backend System
echo ================================================================
echo.
echo [*] Starting LAWVOX Backend Server on Port 5000...

cd /d "%~dp0backend"

:: Launch the server in a minimized background process if not already running
start /B node dist/server.js

:: Wait 1.5 seconds for the server to initialize
timeout /t 2 /nobreak >nul

echo [*] Opening Application in your browser...
start http://localhost:5000

echo.
echo ================================================================
echo   STATUS: ONLINE & PERMANENT
echo   LINK:   http://localhost:5000
echo.
echo   Keep this window open to keep LAWVOX running!
echo   You can minimize this window anytime.
echo ================================================================
echo.

pause
