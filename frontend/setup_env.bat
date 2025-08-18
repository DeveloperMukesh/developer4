@echo off
echo Creating .env.local file...
echo NEXT_PUBLIC_API_URL=https://developer4.onrender.com > .env.local
echo.
echo .env.local file created successfully!
echo.
echo Content of .env.local:
type .env.local
echo.
echo Your frontend is now configured to use https://developer4.onrender.com
echo Remember to restart your Next.js development server!
pause
