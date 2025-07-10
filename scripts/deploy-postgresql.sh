#!/bin/bash

# Script deploy backend với PostgreSQL
# Sử dụng: ./scripts/deploy-postgresql.sh [render|railway|heroku]

set -e

echo "🚀 Bắt đầu deploy backend với PostgreSQL..."

# Kiểm tra platform
PLATFORM=${1:-render}

case $PLATFORM in
  "render")
    echo "📦 Deploying to Render..."
    echo "1. Đảm bảo đã push code lên GitHub"
    echo "2. Truy cập https://render.com"
    echo "3. Tạo New Web Service từ GitHub repo"
    echo "4. Cấu hình environment variables:"
    echo "   - NODE_ENV=production"
    echo "   - JWT_SECRET=your_secret_here"
    echo "   - FRONTEND_URL=https://work-with-tom.netlify.app"
    echo "   - DATABASE_URL=postgresql://..."
    echo "5. Tạo PostgreSQL database trong Render"
    ;;
  "railway")
    echo "📦 Deploying to Railway..."
    echo "1. Đảm bảo đã push code lên GitHub"
    echo "2. Truy cập https://railway.app"
    echo "3. Deploy from GitHub repo"
    echo "4. Cấu hình environment variables:"
    echo "   - NODE_ENV=production"
    echo "   - JWT_SECRET=your_secret_here"
    echo "   - FRONTEND_URL=https://work-with-tom.netlify.app"
    echo "   - DATABASE_URL=postgresql://..."
    echo "5. Tạo PostgreSQL database trong Railway"
    ;;
  "heroku")
    echo "📦 Deploying to Heroku..."
    
    # Kiểm tra Heroku CLI
    if ! command -v heroku &> /dev/null; then
        echo "❌ Heroku CLI chưa được cài đặt"
        echo "Cài đặt: https://devcenter.heroku.com/articles/heroku-cli"
        exit 1
    fi
    
    # Login Heroku
    heroku login
    
    # Tạo app nếu chưa có
    if [ -z "$HEROKU_APP_NAME" ]; then
        echo "Tạo Heroku app..."
        heroku create
    else
        heroku git:remote -a $HEROKU_APP_NAME
    fi
    
    # Thêm PostgreSQL
    heroku addons:create heroku-postgresql:mini
    
    # Cấu hình environment variables
    heroku config:set NODE_ENV=production
    heroku config:set JWT_SECRET=$(openssl rand -base64 32)
    heroku config:set FRONTEND_URL=https://work-with-tom.netlify.app
    
    # Deploy
    git add .
    git commit -m "Deploy to Heroku with PostgreSQL"
    git push heroku main
    
    echo "✅ Deployed to Heroku successfully!"
    echo "🌐 App URL: $(heroku info -s | grep web_url | cut -d= -f2)"
    ;;
  *)
    echo "❌ Platform không hợp lệ. Sử dụng: render, railway, hoặc heroku"
    exit 1
    ;;
esac

echo "✅ Deploy script completed!"
echo "🔍 Kiểm tra deployment tại: https://your-backend-url.com/api/health" 