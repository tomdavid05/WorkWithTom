# 🚀 Hướng dẫn Deploy Project "Let's Do It"

## 📋 **Chuẩn bị trước khi deploy**

### **Yêu cầu:**
1. ✅ **Tài khoản GitHub** - để push code
2. ✅ **Tài khoản Vercel** - deploy frontend (miễn phí)
3. ✅ **Tài khoản Railway** - deploy backend (miễn phí)
4. ✅ **Database** - SQL Server hoặc PostgreSQL

---

## 🎯 **Bước 1: Chuẩn bị Database**

### **Option A: Railway PostgreSQL (Khuyến nghị)**

1. **Đăng ký Railway:**
   - Truy cập [railway.app](https://railway.app)
   - Đăng ký tài khoản với GitHub

2. **Tạo PostgreSQL Database:**
   - Click "New Project"
   - Chọn "Provision PostgreSQL"
   - Copy connection string

3. **Cấu hình Environment Variables:**
   ```
   DATABASE_URL=postgresql://username:password@host:port/database
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   NODE_ENV=production
   PORT=5000
   ```

### **Option B: SQL Server**

1. **Azure SQL Database:**
   - Tạo Azure account
   - Tạo SQL Database
   - Copy connection string

2. **Cấu hình Environment Variables:**
   ```
   SQL_USER=your_username
   SQL_PASSWORD=your_password
   SQL_DATABASE=your_database
   SQL_SERVER=your_server.database.windows.net
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   NODE_ENV=production
   PORT=5000
   ```

---

## 🎯 **Bước 2: Push Code lên GitHub**

### **1. Tạo GitHub Repository:**
```bash
# Tạo repository mới trên GitHub
# Copy repository URL
```

### **2. Push Code:**
```bash
# Khởi tạo git
git init

# Thêm tất cả files
git add .

# Commit đầu tiên
git commit -m "Initial commit - Let's Do It Todo App"

# Thêm remote origin
git remote add origin https://github.com/your-username/your-repo.git

# Push lên GitHub
git branch -M main
git push -u origin main
```

### **3. Cấu trúc Repository:**
```
your-repo/
├── frontend/          # React app
├── backend/           # Node.js server
├── README.md
└── .gitignore
```

---

## 🎯 **Bước 3: Deploy Backend (Railway)**

### **1. Tạo Railway Project:**
- Truy cập [railway.app](https://railway.app)
- Click "New Project"
- Chọn "Deploy from GitHub repo"
- Chọn repository của bạn

### **2. Cấu hình Backend:**
- **Root Directory**: `backend`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### **3. Thêm Environment Variables:**
```
DATABASE_URL=postgresql://username:password@host:port/database
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=production
PORT=5000
```

### **4. Deploy:**
- Railway sẽ tự động build và deploy
- Lấy URL backend (ví dụ: `https://your-app.railway.app`)

---

## 🎯 **Bước 4: Deploy Frontend (Vercel)**

### **1. Tạo Vercel Project:**
- Truy cập [vercel.com](https://vercel.com)
- Click "New Project"
- Import GitHub repository

### **2. Cấu hình Frontend:**
- **Framework Preset**: Vite
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### **3. Thêm Environment Variables:**
```
VITE_API_URL=https://your-app.railway.app/api
```

### **4. Cập nhật API URL:**
Trong `frontend/src/contexts/AuthContext.jsx`:
```javascript
axios.defaults.baseURL = process.env.NODE_ENV === 'production' 
  ? 'https://your-app.railway.app/api'  // URL từ Railway
  : 'http://localhost:5000/api';
```

### **5. Deploy:**
- Vercel sẽ tự động build và deploy
- Lấy URL frontend (ví dụ: `https://your-app.vercel.app`)

---

## 🎯 **Bước 5: Cập nhật CORS**

### **1. Cập nhật Backend CORS:**
Trong `backend/server.js`:
```javascript
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-app.vercel.app']  // Frontend URL
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
```

### **2. Redeploy Backend:**
- Railway sẽ tự động redeploy khi có thay đổi

---

## 🎯 **Bước 6: Test ứng dụng**

### **1. Test Frontend:**
- Truy cập frontend URL
- Đăng ký tài khoản mới
- Test tạo task
- Test complete task
- Kiểm tra Energy Bar

### **2. Test Backend:**
- Health check: `https://your-app.railway.app/api/health`
- Test API endpoints
- Kiểm tra database connection

### **3. Test Security:**
- Test authentication
- Test protected routes
- Test CORS

---

## 🔧 **Troubleshooting**

### **Lỗi Database Connection:**
```bash
# Kiểm tra DATABASE_URL
# Kiểm tra SSL settings
# Kiểm tra firewall rules
```

### **Lỗi CORS:**
```bash
# Kiểm tra origin URL
# Kiểm tra credentials
# Kiểm tra preflight requests
```

### **Lỗi Build:**
```bash
# Kiểm tra Node.js version
# Kiểm tra dependencies
# Kiểm tra build logs
```

### **Lỗi Environment Variables:**
```bash
# Kiểm tra variable names
# Kiểm tra values
# Redeploy sau khi thay đổi
```

---

## 📊 **Monitoring & Analytics**

### **1. Railway Dashboard:**
- Monitor backend performance
- View logs
- Check resource usage

### **2. Vercel Dashboard:**
- Monitor frontend performance
- View analytics
- Check deployment status

### **3. Database Monitoring:**
- Monitor connections
- Check query performance
- View error logs

---

## 🔄 **Continuous Deployment**

### **1. Auto Deploy:**
- Mỗi khi push code lên GitHub
- Railway và Vercel tự động deploy
- Không cần manual deployment

### **2. Environment Management:**
- Development: `localhost`
- Production: `railway.app` + `vercel.app`
- Staging: Có thể tạo thêm

### **3. Version Control:**
- Git tags cho releases
- Branch protection
- Code review process

---

## 🚀 **Performance Optimization**

### **1. Frontend:**
- ✅ Code splitting
- ✅ Lazy loading
- ✅ Image optimization
- ✅ CDN caching

### **2. Backend:**
- ✅ Connection pooling
- ✅ Query optimization
- ✅ Caching
- ✅ Rate limiting

### **3. Database:**
- ✅ Indexed queries
- ✅ Connection pooling
- ✅ Query optimization

---

## 🔒 **Security Checklist**

### **✅ Environment Variables:**
- JWT_SECRET is secure
- DATABASE_URL is private
- No sensitive data in code

### **✅ CORS Configuration:**
- Only allow specific origins
- Credentials properly configured
- No wildcard origins

### **✅ Authentication:**
- JWT tokens properly configured
- Password hashing working
- Token expiration set

### **✅ Database Security:**
- Connection encrypted
- User permissions limited
- No SQL injection vulnerabilities

---

## 📱 **Mobile Optimization**

### **1. PWA Features:**
- Add manifest.json
- Add service worker
- Enable offline functionality

### **2. Responsive Design:**
- Test on mobile devices
- Optimize touch interactions
- Check loading times

### **3. Performance:**
- Optimize bundle size
- Enable compression
- Use CDN

---

## 🎉 **Kết quả**

Sau khi hoàn thành, bạn sẽ có:

✅ **Frontend**: `https://your-app.vercel.app`  
✅ **Backend**: `https://your-app.railway.app`  
✅ **Database**: PostgreSQL trên Railway  
✅ **Auto Deploy**: Tự động deploy khi push code  
✅ **SSL Certificate**: HTTPS tự động  
✅ **CDN**: Global content delivery  
✅ **Monitoring**: Performance tracking  

### **URLs:**
- 🌐 **Website**: `https://your-app.vercel.app`
- 🔧 **API**: `https://your-app.railway.app/api`
- 📊 **Health Check**: `https://your-app.railway.app/api/health`

### **Features:**
- ✅ User registration/login
- ✅ Task management
- ✅ Energy Bar system
- ✅ Real-time updates
- ✅ Mobile responsive
- ✅ Secure authentication

---

## 🚀 **Next Steps**

1. **Test thoroughly** - đảm bảo mọi tính năng hoạt động
2. **Add analytics** - Google Analytics, Vercel Analytics
3. **Set up monitoring** - error tracking, performance monitoring
4. **Add custom domain** - nếu muốn
5. **Scale up** - khi có nhiều users
6. **Add features** - notifications, sharing, etc.

Bạn có muốn tôi hướng dẫn chi tiết từng bước cụ thể không? 🎯 