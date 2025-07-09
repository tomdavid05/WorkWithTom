#!/bin/bash

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

# Check if required tools are installed
check_requirements() {
    print_status "Checking requirements..."
    
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js first."
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm first."
        exit 1
    fi
    
    if ! command -v git &> /dev/null; then
        print_error "Git is not installed. Please install Git first."
        exit 1
    fi
    
    print_success "All requirements are met!"
}

# Deploy Backend
deploy_backend() {
    print_status "Deploying Backend to Railway..."
    
    cd backend
    
    # Check if Railway CLI is installed
    if ! command -v railway &> /dev/null; then
        print_warning "Railway CLI not found. Installing..."
        npm install -g @railway/cli
    fi
    
    # Login to Railway (if not already logged in)
    if ! railway whoami &> /dev/null; then
        print_status "Please login to Railway..."
        railway login
    fi
    
    # Deploy to Railway
    print_status "Deploying to Railway..."
    railway up --detach
    
    if [ $? -eq 0 ]; then
        print_success "Backend deployed successfully!"
        
        # Get the deployed URL
        BACKEND_URL=$(railway status --json | grep -o '"url":"[^"]*"' | cut -d'"' -f4)
        echo "Backend URL: $BACKEND_URL"
        
        # Save the URL for frontend
        echo $BACKEND_URL > ../.backend-url
    else
        print_error "Backend deployment failed!"
        exit 1
    fi
    
    cd ..
}

# Deploy Frontend
deploy_frontend() {
    print_status "Deploying Frontend to Vercel..."
    
    cd frontend
    
    # Check if Vercel CLI is installed
    if ! command -v vercel &> /dev/null; then
        print_warning "Vercel CLI not found. Installing..."
        npm install -g vercel
    fi
    
    # Build the project
    print_status "Building frontend..."
    npm run build
    
    if [ $? -ne 0 ]; then
        print_error "Frontend build failed!"
        exit 1
    fi
    
    # Deploy to Vercel
    print_status "Deploying to Vercel..."
    vercel --prod --yes
    
    if [ $? -eq 0 ]; then
        print_success "Frontend deployed successfully!"
        
        # Get the deployed URL
        FRONTEND_URL=$(vercel ls --json | grep -o '"url":"[^"]*"' | cut -d'"' -f4)
        echo "Frontend URL: $FRONTEND_URL"
        
        # Save the URL
        echo $FRONTEND_URL > ../.frontend-url
    else
        print_error "Frontend deployment failed!"
        exit 1
    fi
    
    cd ..
}

# Update environment variables
update_env_vars() {
    print_status "Updating environment variables..."
    
    if [ -f .backend-url ]; then
        BACKEND_URL=$(cat .backend-url)
        print_status "Backend URL: $BACKEND_URL"
        
        # Update frontend environment
        cd frontend
        echo "VITE_API_URL=$BACKEND_URL" > .env.production
        print_success "Frontend environment updated!"
        cd ..
    fi
}

# Main deployment function
main() {
    print_status "Starting deployment process..."
    
    # Check requirements
    check_requirements
    
    # Deploy backend
    deploy_backend
    
    # Update environment variables
    update_env_vars
    
    # Deploy frontend
    deploy_frontend
    
    print_success "🎉 Deployment completed successfully!"
    print_status "Your app is now live!"
    
    if [ -f .frontend-url ]; then
        FRONTEND_URL=$(cat .frontend-url)
        echo "Frontend: $FRONTEND_URL"
    fi
    
    if [ -f .backend-url ]; then
        BACKEND_URL=$(cat .backend-url)
        echo "Backend: $BACKEND_URL"
    fi
}

# Run main function
main "$@" 