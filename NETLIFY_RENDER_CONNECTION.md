# 🔗 Kết nối Netlify (Frontend) với Render (Backend)

## 📋 Tổng quan
Hướng dẫn này sẽ giúp bạn kết nối frontend đang chạy trên Netlify với backend PostgreSQL đang chạy trên Render.

## 🚀 Bước 1: Deploy Backend lên Render

### 1.1 Tạo tài khoản Render
1. Truy cập https://render.com
2. Đăng ký tài khoản mới (có thể dùng GitHub)

### 1.2 Deploy Backend
1. Trong Render dashboard, click "New +"
2. Chọn "Web Service"
3. Connect với GitHub repository của bạn
4. Cấu hình:
   - **Name**: `lets-do-it-backend` (hoặc tên bạn muốn)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

### 1.3 Cấu hình Environment Variables
Trong Render dashboard, thêm các biến môi trường:

```env
NODE_ENV=production
JWT_SECRET=your_super_secret_jwt_key_here
FRONTEND_URL=https://work-with-tom.netlify.app
DATABASE_URL=postgresql://username:password@host:port/database
```

### 1.4 Tạo PostgreSQL Database
1. Trong Render dashboard, click "New +"
2. Chọn "PostgreSQL"
3. Cấu hình:
   - **Name**: `lets-do-it-postgres`
   - **Database**: `todo_db`
   - **User**: `todo_user`
   - **Plan**: Free
4. Copy connection string và thêm vào `DATABASE_URL`

### 1.5 Lấy Backend URL
Sau khi deploy thành công, bạn sẽ có URL như:
```
https://lets-do-it-backend.onrender.com
```

## 🌐 Bước 2: Cập nhật Frontend

### 2.1 Cập nhật Environment Variables
Tạo file `.env` trong thư mục `frontend/`:

```env
# Development
VITE_API_URL=http://localhost:5000/api

# Production (thay thế bằng URL Render của bạn)
VITE_API_URL=https://lets-do-it-backend.onrender.com/api
```

### 2.2 Cấu hình Netlify Environment Variables
1. Truy cập Netlify dashboard
2. Chọn site của bạn
3. Vào "Site settings" > "Environment variables"
4. Thêm biến:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://lets-do-it-backend.onrender.com/api`

### 2.3 Deploy Frontend
```bash
# Commit và push code
git add .
git commit -m "Update API URL for Render backend"
git push origin main

# Netlify sẽ tự động deploy
```

## 🔍 Bước 3: Kiểm tra kết nối

### 3.1 Test Backend Health Check
```bash
curl https://lets-do-it-backend.onrender.com/api/health
```

Response mong đợi:
```json
{
  "success": true,
  "message": "Let's do it API is running!",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 3.2 Test Frontend-Backend Connection
1. Mở website Netlify của bạn
2. Thử đăng ký tài khoản mới
3. Kiểm tra console để đảm bảo không có lỗi CORS
4. Thử đăng nhập và tạo task

### 3.3 Kiểm tra Network Tab
1. Mở Developer Tools (F12)
2. Vào tab Network
3. Thực hiện một action (đăng ký/đăng nhập)
4. Kiểm tra request đến Render backend

## 🔧 Troubleshooting

### Lỗi CORS
**Triệu chứng**: Lỗi trong console về CORS policy

**Giải pháp**:
1. Kiểm tra `FRONTEND_URL` trong Render environment variables
2. Đảm bảo URL đúng và không có trailing slash
3. Restart Render service

### Lỗi API Connection
**Triệu chứng**: Frontend không thể kết nối đến backend

**Giải pháp**:
1. Kiểm tra `VITE_API_URL` trong Netlify environment variables
2. Đảm bảo backend URL đúng
3. Test backend health check endpoint

### Lỗi Database
**Triệu chứng**: Backend logs hiển thị database connection failed

**Giải pháp**:
1. Kiểm tra `DATABASE_URL` format
2. Đảm bảo PostgreSQL database đã được tạo
3. Kiểm tra SSL settings

## 📊 Monitoring

### 1. Render Dashboard
- Kiểm tra logs trong Render dashboard
- Monitor database connections
- Check response times

### 2. Netlify Dashboard
- Kiểm tra deploy status
- Monitor environment variables
- Check build logs

### 3. Browser Console
- Kiểm tra network requests
- Monitor CORS errors
- Check authentication flow

## 🔄 Cập nhật sau này

### Khi thay đổi Backend URL
1. Cập nhật `VITE_API_URL` trong Netlify environment variables
2. Trigger new deploy trên Netlify
3. Test lại kết nối

### Khi thay đổi Frontend URL
1. Cập nhật `FRONTEND_URL` trong Render environment variables
2. Restart Render service
3. Test CORS

## ✅ Checklist hoàn thành

- [ ] ✅ Backend deployed trên Render
- [ ] ✅ PostgreSQL database được tạo
- [ ] ✅ Environment variables được cấu hình
- [ ] ✅ Frontend environment variables được cập nhật
- [ ] ✅ Netlify environment variables được set
- [ ] ✅ Health check endpoint hoạt động
- [ ] ✅ User registration hoạt động
- [ ] ✅ User login hoạt động
- [ ] ✅ Task creation hoạt động
- [ ] ✅ Không có lỗi CORS
- [ ] ✅ Network requests thành công

## 🎯 Kết quả mong đợi

Sau khi hoàn thành, bạn sẽ có:
- **Frontend**: https://work-with-tom.netlify.app
- **Backend**: https://lets-do-it-backend.onrender.com
- **Database**: PostgreSQL trên Render
- **Kết nối**: Frontend ↔ Backend ↔ Database hoạt động mượt mà

---

**Status**: 🔗 Ready to connect!
**Last Updated**: $(date) 