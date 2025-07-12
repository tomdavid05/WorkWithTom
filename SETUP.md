# Let's do it - Setup Instructions

This guide will help you set up and run the "Let's do it" todo application on your local machine.

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL
- npm or yarn package manager

## Database Setup

1. **Install PostgreSQL** (if not already installed)
   - Download PostgreSQL from https://www.postgresql.org/download/
   - Install with default settings
   - Note down the password you set during installation

2. **Create Database**
   ```sql
   CREATE DATABASE todo_app;
   ```

3. **Configure Database Connection**
   - Open `backend/config.env`
   - Update the following variables with your PostgreSQL details:
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/todo_app
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   PORT=5000
   NODE_ENV=development
   ```

## Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

   The backend will run on `http://localhost:5000`

## Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:5173`

## Usage

1. Open your browser and go to `http://localhost:5173`
2. Register a new account or login with existing credentials
3. Start creating and managing your tasks!

## Features

- ✅ User authentication (register/login)
- ✅ Create, read, update, delete tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Set task priorities (low, medium, high)
- ✅ Set due dates for tasks
- ✅ Search and filter tasks
- ✅ Beautiful, responsive UI
- ✅ Real-time task statistics
- ✅ Modern animations and transitions

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Tasks
- `GET /api/tasks` - Get all user tasks (protected)
- `POST /api/tasks` - Create new task (protected)
- `PUT /api/tasks/:id` - Update task (protected)
- `DELETE /api/tasks/:id` - Delete task (protected)
- `PATCH /api/tasks/:id/toggle` - Toggle task completion (protected)

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Check firewall settings
- Verify connection string in `config.env`
- Make sure PostgreSQL service is started

### Port Conflicts
- If port 5000 is in use, change `PORT` in `config.env`
- If port 5173 is in use, Vite will automatically use the next available port

### CORS Issues
- The backend is configured to accept requests from `http://localhost:5173`
- If using a different port, update the CORS configuration in `server.js`

## Production Deployment

For production deployment:

1. **Backend**
   - Set `NODE_ENV=production` in environment variables
   - Use a production database
   - Set a strong `JWT_SECRET`
   - Use HTTPS
   - Configure proper CORS origins

2. **Frontend**
   - Build the application: `npm run build`
   - Serve the `dist` folder with a web server
   - Update API base URL to production endpoint

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express, PostgreSQL
- **Authentication**: JWT
- **Database**: PostgreSQL with pg package
- **UI Components**: Lucide React icons, React Hot Toast

## Support

If you encounter any issues, please check:
1. All prerequisites are installed
2. Database connection is working
3. Environment variables are correctly set
4. Both backend and frontend are running

Happy task managing! 🎉 