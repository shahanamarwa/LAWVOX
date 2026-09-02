Set WshShell = CreateObject("WScript.Shell")
WshShell.Run "cmd.exe /c cd /d ""D:\LAWVOX\backend"" && node dist/server.js", 0, False
WScript.Sleep 1500
WshShell.Run "http://localhost:5000"
