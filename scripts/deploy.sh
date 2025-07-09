#!/bin/bash

# 🚀 Deploy Script for Let's Do It Todo App
# This script helps automate the deployment process

echo "🚀 Starting deployment process..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if git is installed
if ! command -v git &> /dev/null; then
    print_error "Git is not installed. Please install Git first."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

print_status "Checking project structure..."

# Check if backend directory exists
if [ ! -d "backend" ]; then
    print_error "Backend directory not found!"
    exit 1
fi

# Check if frontend directory exists
if [ ! -d "frontend" ]; then
    print_error "Frontend directory not found!"
    exit 1
fi

print_success "Project structure is valid"

# Test backend locally
print_status "Testing backend locally..."

cd backend

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    print_status "Installing backend dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        print_error "Failed to install backend dependencies"
        exit 1
    fi
fi

# Check if config.env exists
if [ ! -f "config.env" ]; then
    print_warning "config.env not found. Please create it with your database configuration."
    echo "Example config.env:"
    echo "SQL_USER=your_username"
    echo "SQL_PASSWORD=your_password"
    echo "SQL_DATABASE=your_database"
    echo "SQL_SERVER=your_server"
    echo "JWT_SECRET=your_secret_key"
    echo "PORT=5000"
    echo "NODE_ENV=development"
fi

print_success "Backend setup complete"

# Test frontend locally
print_status "Testing frontend locally..."

cd ../frontend

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    print_status "Installing frontend dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        print_error "Failed to install frontend dependencies"
        exit 1
    fi
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    print_warning ".env not found. Please create it with your API URL."
    echo "Example .env:"
    echo "VITE_API_URL=http://localhost:5000"
fi

print_success "Frontend setup complete"

# Check git status
cd ..
print_status "Checking git status..."

if [ -z "$(git status --porcelain)" ]; then
    print_success "Working directory is clean"
else
    print_warning "Working directory has uncommitted changes"
    echo "Files with changes:"
    git status --porcelain
    echo ""
    read -p "Do you want to commit these changes? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git add .
        git commit -m "Auto-commit before deployment"
        print_success "Changes committed"
    fi
fi

# Check if remote repository is configured
if ! git remote get-url origin &> /dev/null; then
    print_error "No remote repository configured!"
    echo "Please add your GitHub repository:"
    echo "git remote add origin https://github.com/your-username/your-repo.git"
    exit 1
fi

print_status "Pushing to GitHub..."

# Push to GitHub
git push origin main
if [ $? -ne 0 ]; then
    print_error "Failed to push to GitHub"
    exit 1
fi

print_success "Code pushed to GitHub successfully!"

echo ""
echo "🎉 Deployment preparation complete!"
echo ""
echo "📋 Next steps:"
echo "1. Deploy backend to Railway:"
echo "   - Go to https://railway.app"
echo "   - Create new project from GitHub"
echo "   - Set root directory to 'backend'"
echo "   - Add environment variables"
echo ""
echo "2. Deploy frontend to Netlify:"
echo "   - Go to https://netlify.com"
echo "   - Create new site from GitHub"
echo "   - Set base directory to 'frontend'"
echo "   - Set build command to 'npm run build'"
echo "   - Set publish directory to 'dist'"
echo ""
echo "3. Update environment variables:"
echo "   - Add VITE_API_URL in Netlify"
echo "   - Add FRONTEND_URL in Railway"
echo ""
echo "4. Test the deployment:"
echo "   - Test backend health check"
echo "   - Test frontend functionality"
echo "   - Test user registration/login"
echo ""

print_success "Deployment script completed successfully!" 