# Hướng dẫn Deploy Backend với PostgreSQL

## 🚀 Tổng quan
Backend đã được cấu hình để hỗ trợ cả SQL Server (local) và PostgreSQL (production). Khi có biến môi trường `DATABASE_URL`, hệ thống sẽ tự động sử dụng PostgreSQL.

## 📋 Yêu cầu
- Node.js >= 18.0.0
- PostgreSQL database (có thể dùng Render, Railway, hoặc Heroku Postgres)

## 🔧 Cấu hình Local Development

### 1. Cài đặt PostgreSQL local (tùy chọn)
```bash
# Windows với Chocolatey
choco install postgresql

# Hoặc tải từ https://www.postgresql.org/download/
```

### 2. Cấu hình environment variables
Tạo file `config.env` trong thư mục `backend/`:

```env
# Cho SQL Server (local development)
SQL_USER=sa
SQL_PASSWORD=12345
SQL_DATABASE=todo_db
SQL_SERVER=DAVIDTOM\SQLEXPRESS

# Cho PostgreSQL (production)
# DATABASE_URL=postgresql://username:password@host:port/database

JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
PORT=5000
NODE_ENV=development
FRONTEND_URL=https://work-with-tom.netlify.app
```

### 3. Chạy local
```bash
cd backend
npm install
npm run dev
```

## 🌐 Deploy lên Production

### Option 1: Render (Khuyến nghị)

#### Bước 1: Tạo tài khoản Render
1. Truy cập https://render.com
2. Đăng ký tài khoản mới

#### Bước 2: Deploy từ GitHub
1. Kết nối GitHub repository
2. Chọn "New Web Service"
3. Chọn repository của bạn
4. Cấu hình:
   - **Name**: `lets-do-it-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

#### Bước 3: Cấu hình Environment Variables
Trong dashboard Render, thêm các biến môi trường:

```env
NODE_ENV=production
JWT_SECRET=your_super_secret_jwt_key_here
FRONTEND_URL=https://work-with-tom.netlify.app
DATABASE_URL=postgresql://username:password@host:port/database
```

#### Bước 4: Tạo PostgreSQL Database
1. Trong Render dashboard, tạo "New PostgreSQL"
2. Chọn plan Free
3. Copy connection string và thêm vào `DATABASE_URL`

### Option 2: Railway

#### Bước 1: Tạo tài khoản Railway
1. Truy cập https://railway.app
2. Đăng ký tài khoản mới

#### Bước 2: Deploy từ GitHub
1. Kết nối GitHub repository
2. Chọn "Deploy from GitHub repo"
3. Chọn repository của bạn

#### Bước 3: Cấu hình Environment Variables
Trong Railway dashboard, thêm các biến môi trường:

```env
NODE_ENV=production
JWT_SECRET=your_super_secret_jwt_key_here
FRONTEND_URL=https://work-with-tom.netlify.app
DATABASE_URL=postgresql://username:password@host:port/database
```

#### Bước 4: Tạo PostgreSQL Database
1. Trong Railway dashboard, tạo "New Database"
2. Chọn PostgreSQL
3. Copy connection string và thêm vào `DATABASE_URL`

### Option 3: Heroku

#### Bước 1: Cài đặt Heroku CLI
```bash
# Windows
choco install heroku

# Hoặc tải từ https://devcenter.heroku.com/articles/heroku-cli
```

#### Bước 2: Login và tạo app
```bash
heroku login
heroku create your-app-name
```

#### Bước 3: Thêm PostgreSQL addon
```bash
heroku addons:create heroku-postgresql:mini
```

#### Bước 4: Cấu hình environment variables
```bash
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your_super_secret_jwt_key_here
heroku config:set FRONTEND_URL=https://work-with-tom.netlify.app
```

#### Bước 5: Deploy
```bash
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

## 🔍 Kiểm tra Deployment

### 1. Health Check
Sau khi deploy, kiểm tra endpoint health:
```
GET https://your-backend-url.com/api/health
```

### 2. Kiểm tra Database
Backend sẽ tự động tạo tables khi khởi động. Kiểm tra logs để đảm bảo:
- ✅ PostgreSQL connected successfully
- ✅ Database tables ready

### 3. Test API Endpoints
```bash
# Test đăng ký
curl -X POST https://your-backend-url.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@example.com","password":"password123"}'

# Test đăng nhập
curl -X POST https://your-backend-url.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## 🔧 Troubleshooting

### Lỗi Database Connection
1. Kiểm tra `DATABASE_URL` format
2. Đảm bảo database đã được tạo
3. Kiểm tra firewall/network settings

### Lỗi CORS
1. Kiểm tra `FRONTEND_URL` trong environment variables
2. Đảm bảo frontend URL đúng và accessible

### Lỗi JWT
1. Kiểm tra `JWT_SECRET` đã được set
2. Đảm bảo secret đủ mạnh (ít nhất 32 ký tự)

## 📝 Notes
- Backend tự động detect PostgreSQL khi có `DATABASE_URL`
- Tables sẽ được tạo tự động khi khởi động
- SSL được enable cho production
- Rate limiting được áp dụng cho tất cả API endpoints 