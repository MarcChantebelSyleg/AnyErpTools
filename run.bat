@echo off
set "PATH=%~dp0NodeJS;%PATH%"
cd /d "%~dp0"

call npm install
call npm start
