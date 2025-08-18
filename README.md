# Developer Portfolio - Full Stack Application

A modern, responsive developer portfolio built with Next.js, Express, and MongoDB. This application showcases projects, skills, and provides a contact form for potential clients or employers.

## Features

### Frontend (Next.js + TypeScript)
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Multiple Pages**: Home, Projects, About, and Contact pages
- **Project Management**: Add, edit, delete, and filter projects
- **Search & Filtering**: Advanced search and category/status filtering
- **Modern UI**: Beautiful gradients, animations, and interactive elements
- **Form Validation**: Client-side validation with proper error handling

### Backend (Express + MongoDB)
- **RESTful API**: Full CRUD operations for projects
- **Data Validation**: Input validation using express-validator
- **MongoDB Integration**: Mongoose ODM with proper schemas
- **Error Handling**: Comprehensive error handling and responses
- **CORS Support**: Cross-origin resource sharing enabled

## Tech Stack

### Frontend
- Next.js 15.4.6
- React 19.1.0
- TypeScript
- Tailwind CSS 4
- Lucide React (Icons)
- React Hook Form
- Axios
- React Hot Toast

### Backend
- Node.js
- Express 5.1.0
- MongoDB with Mongoose
- CORS
- Express Validator
- Dotenv

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

## Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd developer-portfolio
```

### 2. Install backend dependencies
```bash
cd backend
npm install
```

### 3. Install frontend dependencies
```bash
cd ../frontend
npm install
```

### 4. Environment Setup

#### Backend
Create a `.env` file in the `backend` directory:
```bash
cd ../backend
cp env.example .env
```

Edit the `.env` file with your MongoDB connection string:
```env
MONGO_URI=mongodb://localhost:27017/developer-portfolio
PORT=5000
NODE_ENV=development
```

**Note**: If you don't have MongoDB installed locally, you can use MongoDB Atlas:
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/developer-portfolio
```

### 5. Start MongoDB
If using local MongoDB:
```bash
# Start MongoDB service
mongod
```

### 6. Run the application

#### Terminal 1 - Backend
```bash
cd backend
npm run dev
```
The backend will run on `http://localhost:5000`

#### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```
The frontend will run on `http://localhost:3000`

## Usage

### Adding Projects
1. Navigate to the home page or projects page
2. Click "Add New Project" button
3. Fill in the project details:
   - Title (required)
   - Description (required)
   - Tech Stack (at least one technology required)
   - Image URL (optional)
   - Live URL (optional)
   - GitHub URL (optional)
   - Category (Web App, Mobile App, Desktop App, API, Other)
   - Status (Completed, In Progress, Planning)
   - Featured (checkbox to mark as featured project)
4. Click "Add Project" to save

### Managing Projects
- **View**: All projects are displayed on the home page and projects page
- **Edit**: Click the "Edit" button on any project card
- **Delete**: Click the "Delete" button to remove a project
- **Filter**: Use the search bar and filter dropdowns to find specific projects

### Navigation
- **Home**: Landing page with featured projects and quick add functionality
- **Projects**: Dedicated page for project management with advanced filtering
- **About**: Developer information, skills, experience, and education
- **Contact**: Contact form and contact information

## API Endpoints

### Projects
- `GET /api/projects` - Get all projects with filtering and pagination
- `GET /api/projects/featured` - Get featured projects
- `GET /api/projects/:id` - Get a specific project
- `POST /api/projects` - Create a new project
- `PUT /api/projects/:id` - Update an existing project
- `DELETE /api/projects/:id` - Delete a project

### Query Parameters
- `page` - Page number for pagination
- `limit` - Number of projects per page
- `category` - Filter by project category
- `status` - Filter by project status
- `featured` - Filter by featured status
- `search` - Search in title and description

## Project Structure

```
developer-portfolio/
├── backend/
│   ├── models/
│   │   └── Project.js          # MongoDB schema
│   ├── routes/
│   │   └── projectRoutes.js    # API routes
│   ├── server.js               # Express server
│   ├── package.json            # Backend dependencies
│   └── env.example             # Environment variables template
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx        # Home page
│   │   │   ├── projects/
│   │   │   │   └── page.tsx    # Projects page
│   │   │   ├── about/
│   │   │   │   └── page.tsx    # About page
│   │   │   ├── contact/
│   │   │   │   └── page.tsx    # Contact page
│   │   │   ├── layout.tsx      # Root layout
│   │   │   └── globals.css     # Global styles
│   │   └── components/
│   │       └── Navigation.tsx  # Navigation component
│   ├── package.json            # Frontend dependencies
│   └── next.config.ts          # Next.js configuration
└── README.md                   # This file
```

## Customization

### Styling
- Modify `frontend/src/app/globals.css` for global styles
- Update Tailwind classes in components for styling changes
- Customize color schemes by modifying the gradient classes

### Content
- Update project information in the database
- Modify personal information in the About page
- Update contact details in the Contact page
- Change social media links in the Navigation component

### Features
- Add new project categories in the Project model and forms
- Implement user authentication for admin access
- Add image upload functionality
- Integrate with external services (email, analytics, etc.)

## Deployment

### Backend
1. Set `NODE_ENV=production` in your environment variables
2. Use a process manager like PM2: `pm2 start server.js`
3. Set up a reverse proxy (Nginx) for production
4. Use environment variables for production MongoDB connection

### Frontend
1. Build the application: `npm run build`
2. Start production server: `npm start`
3. Deploy to Vercel, Netlify, or your preferred hosting service

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

If you encounter any issues or have questions:
1. Check the console for error messages
2. Verify MongoDB connection
3. Ensure all environment variables are set correctly
4. Check that all dependencies are installed

## Future Enhancements

- [ ] User authentication and authorization
- [ ] Image upload and management
- [ ] Blog section
- [ ] Admin dashboard
- [ ] Analytics integration
- [ ] Email notifications
- [ ] Dark mode toggle
- [ ] Internationalization (i18n)
- [ ] PWA capabilities
- [ ] API rate limiting
- [ ] Automated testing
