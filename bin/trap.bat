@echo off
@setlocal

set BIN_PATH=%~dp0

if "%PHP_COMMAND%" == "" set PHP_COMMAND=php.exe

cd %BIN_PATH%
"%PHP_COMMAND%" "%BIN_PATH%trap" %*

@endlocal
