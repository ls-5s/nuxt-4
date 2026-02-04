@echo off
chcp 65001
cd /d "%~dp0"
echo 正在启动日志可视化面板...
echo 请在浏览器访问 http://localhost:4000
node log-dashboard/server.js
pause
