# 🔧 Hướng dẫn cấu hình Environment Variables

## 📁 **Cấu trúc file .env:**

### **Backend:**
- ✅ `backend/config.env` - File cấu hình hiện tại
- ✅ `backend/env.example` - Template cho production

### **Frontend:**
- ✅ `frontend/env.example` - Template cho frontend
- ❌ `frontend/.env` - Cần tạo thủ công

---

## 🎯 **Bước 1: Cấu hình Backend**

### **Development (Local):**
```bash
# backend/config.env
SQL_USER=sa
SQL_PASSWORD=12345
SQL_DATABASE=todo_db
SQL_SERVER=DAVIDTOM\SQLEXPRESS
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
PORT=5000
NODE_ENV=development
```

### **Production (Render):**
```bash
# Environment Variables trong Render dashboard
DATABASE_URL=postgresql://username:password@host:port/database
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=production
PORT=10000
FRONTEND_URL=https://your-app.netlify.app
```

---

## 🎯 **Bước 2: Cấu hình Frontend**

### **Development (Local):**
```bash
# frontend/.env (tạo thủ công)
VITE_API_URL=http://localhost:5000/api
```

### **Production (Netlify):**
```bash
# Environment Variables trong Netlify dashboard
VITE_API_URL=https://your-backend-url.onrender.com/api
```

---

## 🔧 **Cách tạo file .env:**

### **1. Backend:**
```bash
# Copy template
cp backend/env.example backend/config.env

# Chỉnh sửa giá trị
nano backend/config.env
```

### **2. Frontend:**
```bash
# Copy template
cp frontend/env.example frontend/.env

# Chỉnh sửa giá trị
nano frontend/.env
```

---

## 📋 **Checklist Environment Variables:**

### **Backend (Development):**
- [ ] `SQL_USER` - Database username
- [ ] `SQL_PASSWORD` - Database password
- [ ] `SQL_DATABASE` - Database name
- [ ] `SQL_SERVER` - Database server
- [ ] `JWT_SECRET` - Secret key cho JWT
- [ ] `PORT` - Port cho server
- [ ] `NODE_ENV` - Environment (development)

### **Backend (Production):**
- [ ] `DATABASE_URL` - PostgreSQL connection string
- [ ] `JWT_SECRET` - Secret key cho JWT
- [ ] `NODE_ENV` - Environment (production)
- [ ] `PORT` - Port cho server
- [ ] `FRONTEND_URL` - Frontend URL cho CORS

### **Frontend (Development):**
- [ ] `VITE_API_URL` - Backend API URL

### **Frontend (Production):**
- [ ] `VITE_API_URL` - Production backend API URL

---

## 🚨 **Lưu ý quan trọng:**

### **1. Security:**
- ✅ **Không commit** file `.env` lên Git
- ✅ **Sử dụng** environment variables trong cloud platforms
- ✅ **Thay đổi** JWT_SECRET cho production
- ✅ **Bảo vệ** database credentials

### **2. Development vs Production:**
```bash
# Development
NODE_ENV=development
VITE_API_URL=http://localhost:5000/api

# Production
NODE_ENV=production
VITE_API_URL=https://your-backend-url.onrender.com/api
```

### **3. Database Configuration:**
```bash
# Local Development (SQL Server)
SQL_USER=sa
SQL_PASSWORD=12345
SQL_DATABASE=todo_db
SQL_SERVER=localhost

# Production (PostgreSQL)
DATABASE_URL=postgresql://username:password@host:port/database
```

---

## 🔍 **Kiểm tra cấu hình:**

### **1. Backend:**
```bash
# Test database connection
cd backend
node test-connection.js

# Expected output:
# ✅ SQL Server connected successfully
# ✅ Database tables ready
```

### **2. Frontend:**
```bash
# Test API connection
cd frontend
npm run dev

# Mở browser và test:
# - Đăng ký user mới
# - Đăng nhập
# - Tạo task
```

---

## 🚀 **Deploy với Environment Variables:**

### **1. Render (Backend):**
1. Vào Render dashboard
2. Chọn Web Service
3. Tab **Environment**
4. Thêm các biến môi trường
5. Click **Save Changes**

### **2. Netlify (Frontend):**
1. Vào Netlify dashboard
2. Chọn site
3. **Site settings** → **Environment variables**
4. Thêm `VITE_API_URL`
5. Deploy lại

---

## 🔧 **Troubleshooting:**

### **Lỗi thường gặp:**
1. **Database connection failed**: Kiểm tra DATABASE_URL
2. **JWT error**: Kiểm tra JWT_SECRET
3. **CORS error**: Kiểm tra FRONTEND_URL
4. **API not found**: Kiểm tra VITE_API_URL

### **Giải pháp:**
1. Kiểm tra format của environment variables
2. Đảm bảo không có khoảng trắng thừa
3. Test locally trước khi deploy
4. Kiểm tra logs trong dashboard

---

## 📞 **Support:**

Nếu gặp vấn đề:
1. Kiểm tra file `.env` có đúng format không
2. Test connection locally
3. Kiểm tra environment variables trong cloud platforms
4. Xem logs để debug

**Lưu ý:** File `.env` không được commit lên Git để bảo mật! 🔒 