# Quick Start Guide

## Prerequisites
- Node.js installed (v18 or higher)
- MongoDB running (local or Atlas)

## Quick Setup

### Option 1: Use Setup Scripts (Recommended)
1. **Windows**: Double-click `setup.bat` or run `setup.ps1` in PowerShell
2. **Mac/Linux**: Run `./setup.sh` in terminal

### Option 2: Manual Setup
1. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

## Environment Setup
1. Copy `backend/env.example` to `backend/.env`
2. Update MongoDB connection string in `.env`:
   ```env
   MONGO_URI=mongodb://localhost:27017/developer-portfolio
   PORT=5000
   NODE_ENV=development
   ```

## Running the Application

### Option 1: Use Start Script (Windows)
Double-click `start.bat` to start both servers automatically.

### Option 2: Manual Start
1. **Terminal 1 - Backend**:
   ```bash
   cd backend
   npm run dev
   ```
   Backend runs on: http://localhost:5000

2. **Terminal 2 - Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend runs on: http://localhost:3000

## First Steps
1. Open http://localhost:3000 in your browser
2. Click "Add New Project" to create your first project
3. Fill in project details and save
4. Explore the different pages: Home, Projects, About, Contact

## Features Available
- ✅ Add/Edit/Delete Projects
- ✅ Search and Filter Projects
- ✅ Responsive Design
- ✅ Multiple Pages
- ✅ Contact Form
- ✅ Project Categories and Status
- ✅ Featured Projects

## Troubleshooting
- **Backend won't start**: Check MongoDB connection and .env file
- **Frontend won't start**: Ensure backend is running first
- **Dependencies issues**: Delete node_modules and run npm install again

## Next Steps
- Customize content in About and Contact pages
- Add your own projects
- Deploy to production
- Add authentication for admin access


