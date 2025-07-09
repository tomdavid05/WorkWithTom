# 🚀 Hướng dẫn Deploy Project

## 📋 **Tổng quan**
- **Backend**: Deploy lên Railway (Node.js API)
- **Frontend**: Deploy lên Netlify (React App)
- **Database**: SQL Server (có thể dùng Railway SQL hoặc Azure)

---

## 🔧 **Bước 1: Deploy Backend lên Railway**

### **1.1 Chuẩn bị Backend**

1. **Đảm bảo file cấu hình đã sẵn sàng:**
   - `backend/package.json` ✅
   - `backend/server.js` ✅
   - `backend/railway.json` ✅

2. **Cập nhật environment variables cho production:**
   ```env
   # backend/config.env (cho production)
   SQL_USER=your_sql_user
   SQL_PASSWORD=your_sql_password
   SQL_DATABASE=your_database_name
   SQL_SERVER=your_sql_server
   JWT_SECRET=your_super_secret_jwt_key_for_production
   PORT=5000
   NODE_ENV=production
   FRONTEND_URL=https://your-app.netlify.app
   ```

### **1.2 Deploy lên Railway**

1. **Tạo tài khoản Railway:**
   - Truy cập [railway.app](https://railway.app)
   - Đăng ký bằng GitHub

2. **Tạo project mới:**
   - Click "New Project"
   - Chọn "Deploy from GitHub repo"
   - Chọn repository của bạn

3. **Cấu hình deployment:**
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

4. **Thêm Environment Variables:**
   - Vào tab "Variables"
   - Thêm các biến môi trường:
   ```
   SQL_USER=your_sql_user
   SQL_PASSWORD=your_sql_password
   SQL_DATABASE=your_database_name
   SQL_SERVER=your_sql_server
   JWT_SECRET=your_super_secret_jwt_key
   NODE_ENV=production
   FRONTEND_URL=https://your-app.netlify.app
   ```

5. **Deploy:**
   - Railway sẽ tự động deploy khi push code
   - Hoặc click "Deploy Now"

6. **Lấy URL API:**
   - Sau khi deploy thành công, copy URL từ tab "Deployments"
   - URL sẽ có dạng: `https://your-app.railway.app`

---

## 🌐 **Bước 2: Deploy Frontend lên Netlify**

### **2.1 Chuẩn bị Frontend**

1. **Cập nhật API URL trong frontend:**
   ```javascript
   // frontend/src/contexts/AuthContext.jsx
   const API_URL = import.meta.env.VITE_API_URL || 'https://your-backend.railway.app';
   ```

2. **Tạo file .env cho production:**
   ```env
   # frontend/.env.production
   VITE_API_URL=https://your-backend.railway.app
   ```

### **2.2 Deploy lên Netlify**

1. **Tạo tài khoản Netlify:**
   - Truy cập [netlify.com](https://netlify.com)
   - Đăng ký bằng GitHub

2. **Tạo site mới:**
   - Click "New site from Git"
   - Chọn GitHub repository

3. **Cấu hình build:**
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

4. **Thêm Environment Variables:**
   - Vào "Site settings" > "Environment variables"
   - Thêm:
   ```
   VITE_API_URL=https://your-backend.railway.app
   ```

5. **Deploy:**
   - Netlify sẽ tự động build và deploy
   - URL sẽ có dạng: `https://your-app.netlify.app`

---

## 🔗 **Bước 3: Cấu hình CORS và Domain**

### **3.1 Cập nhật CORS trong Backend**

```javascript
// backend/server.js
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.FRONTEND_URL, 'https://your-app.netlify.app'] 
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
```

### **3.2 Cập nhật Frontend URL**

Sau khi có URL Netlify, cập nhật lại:
- Environment variable `FRONTEND_URL` trong Railway
- CORS settings trong backend

---

## 🗄️ **Bước 4: Cấu hình Database**

### **4.1 Sử dụng Railway SQL (Khuyến nghị)**

1. **Tạo SQL Database trên Railway:**
   - Trong project Railway, click "New"
   - Chọn "Database" > "Add MySQL" hoặc "Add PostgreSQL"
   - Railway sẽ tự động tạo connection string

2. **Cập nhật connection string:**
   - Copy connection string từ Railway
   - Cập nhật environment variables

### **4.2 Hoặc sử dụng Azure SQL**

1. **Tạo Azure SQL Database**
2. **Cấu hình firewall rules**
3. **Cập nhật connection string**

---

## ✅ **Bước 5: Kiểm tra Deployment**

### **5.1 Test Backend API**
```bash
# Test health check
curl https://your-backend.railway.app/api/health

# Test authentication
curl -X POST https://your-backend.railway.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"test123"}'
```

### **5.2 Test Frontend**
- Truy cập URL Netlify
- Test đăng ký/đăng nhập
- Test tạo task mới

---

## 🔧 **Troubleshooting**

### **Backend Issues:**
1. **Database connection failed:**
   - Kiểm tra connection string
   - Kiểm tra firewall rules
   - Test connection locally

2. **CORS errors:**
   - Kiểm tra FRONTEND_URL trong environment
   - Cập nhật CORS settings

3. **Build failed:**
   - Kiểm tra package.json
   - Kiểm tra Node.js version

### **Frontend Issues:**
1. **API calls failed:**
   - Kiểm tra VITE_API_URL
   - Kiểm tra CORS settings
   - Test API endpoint

2. **Build failed:**
   - Kiểm tra dependencies
   - Kiểm tra Node.js version

---

## 📝 **Checklist Deployment**

### **Backend (Railway):**
- [ ] Repository connected
- [ ] Environment variables set
- [ ] Database configured
- [ ] API endpoints working
- [ ] CORS configured

### **Frontend (Netlify):**
- [ ] Repository connected
- [ ] Build settings configured
- [ ] Environment variables set
- [ ] API URL updated
- [ ] Site deployed successfully

### **Testing:**
- [ ] Backend health check
- [ ] User registration/login
- [ ] Task CRUD operations
- [ ] Dark mode toggle
- [ ] Responsive design

---

## 🎉 **Hoàn thành!**

Sau khi hoàn thành tất cả bước trên, ứng dụng của bạn sẽ được deploy thành công:
- **Backend**: `https://your-app.railway.app`
- **Frontend**: `https://your-app.netlify.app`

**Lưu ý quan trọng:**
- Luôn backup database trước khi deploy
- Test kỹ trước khi deploy production
- Monitor logs để debug issues
- Cập nhật documentation khi có thay đổi 