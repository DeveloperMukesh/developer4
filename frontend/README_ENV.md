# Environment Setup for Frontend

## Required Environment Variables

Create a file called `.env.local` in the `frontend/` directory with the following content:

```env
NEXT_PUBLIC_API_URL=https://developer4.onrender.com
```

## For Local Development

If you want to run the frontend with a local backend, use:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## How to Create .env.local

### Windows (Command Prompt):
```cmd
cd frontend
echo NEXT_PUBLIC_API_URL=https://developer4.onrender.com > .env.local
```

### Windows (PowerShell):
```powershell
cd frontend
"NEXT_PUBLIC_API_URL=https://developer4.onrender.com" | Out-File -FilePath .env.local -Encoding UTF8
```

### Manual Creation:
1. Navigate to the `frontend/` folder
2. Create a new file called `.env.local` (no file extension)
3. Add the content: `NEXT_PUBLIC_API_URL=https://developer4.onrender.com`
4. Save the file

## Important Notes

- The `.env.local` file is automatically ignored by git (it's in `.gitignore`)
- You must restart your Next.js development server after creating/modifying `.env.local`
- The `NEXT_PUBLIC_` prefix is required for client-side access in Next.js
- Your frontend will now send all API requests to `https://developer4.onrender.com`
