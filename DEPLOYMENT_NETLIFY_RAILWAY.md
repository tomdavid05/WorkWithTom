# 🚀 Hướng dẫn Deploy với Railway + Netlify

## 📋 **Chuẩn bị**

### **Yêu cầu:**
1. ✅ **Tài khoản GitHub** - để push code
2. ✅ **Tài khoản Railway** - deploy backend (miễn phí)
3. ✅ **Tài khoản Netlify** - deploy frontend (miễn phí)
4. ✅ **Database** - PostgreSQL trên Railway

---

## 🎯 **Bước 1: Push Code lên GitHub**

```bash
# Khởi tạo git (nếu chưa có)
git init

# Thêm tất cả files
git add .

# Commit
git commit -m "Prepare for deployment with Railway + Netlify"

# Push lên GitHub
git push origin main
```

---

## 🎯 **Bước 2: Deploy Backend trên Railway**

### **1. Tạo Railway Project:**
- Truy cập [railway.app](https://railway.app)
- Đăng ký với GitHub
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
FRONTEND_URL=https://your-app.netlify.app
```

### **4. Tạo PostgreSQL Database:**
- Trong Railway project
- Click "New"
- Chọn "Database" → "PostgreSQL"
- Copy connection string
- Thêm vào `DATABASE_URL`

### **5. Deploy:**
- Railway sẽ tự động build và deploy
- Lấy URL backend (ví dụ: `https://your-app.railway.app`)

---

## 🎯 **Bước 3: Deploy Frontend trên Netlify**

### **1. Tạo Netlify Project:**
- Truy cập [netlify.com](https://netlify.com)
- Click "New site from Git"
- Chọn GitHub
- Chọn repository của bạn

### **2. Cấu hình Build Settings:**
- **Base directory**: `frontend`
- **Build command**: `npm run build`
- **Publish directory**: `dist`

### **3. Thêm Environment Variables:**
```
VITE_API_URL=https://your-app.railway.app/api
```

### **4. Deploy:**
- Netlify sẽ tự động build và deploy
- Lấy URL frontend (ví dụ: `https://your-app.netlify.app`)

---

## 🎯 **Bước 4: Cập nhật CORS**

### **1. Cập nhật Backend CORS:**
Trong Railway dashboard:
- Vào Environment Variables
- Thêm: `FRONTEND_URL=https://your-app.netlify.app`
- Redeploy backend

### **2. Cập nhật Frontend API URL:**
Trong Netlify dashboard:
- Vào Environment Variables
- Thêm: `VITE_API_URL=https://your-app.railway.app/api`
- Redeploy frontend

---

## 🎯 **Bước 5: Test ứng dụng**

### **1. Test Frontend:**
- Truy cập: `https://your-app.netlify.app`
- Đăng ký tài khoản mới
- Test tạo task
- Test complete task

### **2. Test Backend:**
- Health check: `https://your-app.railway.app/api/health`
- Test API endpoints

### **3. Test Database:**
- Kiểm tra kết nối database
- Test tạo user và task

---

## 🔧 **Troubleshooting**

### **Lỗi Build Frontend:**
```bash
# Kiểm tra Node.js version
# Kiểm tra dependencies
# Kiểm tra build logs trong Netlify
```

### **Lỗi Backend:**
```bash
# Kiểm tra Railway logs
# Kiểm tra environment variables
# Kiểm tra database connection
```

### **Lỗi CORS:**
```bash
# Kiểm tra FRONTEND_URL trong Railway
# Kiểm tra VITE_API_URL trong Netlify
# Redeploy cả hai services
```

### **Lỗi Database:**
```bash
# Kiểm tra DATABASE_URL
# Kiểm tra SSL settings
# Kiểm tra Railway database logs
```

---

## 📊 **Monitoring**

### **Railway Dashboard:**
- Monitor backend performance
- View logs
- Check resource usage
- Database monitoring

### **Netlify Dashboard:**
- Monitor frontend performance
- View analytics
- Check deployment status
- Form submissions

---

## 🔄 **Continuous Deployment**

### **Auto Deploy:**
- Mỗi khi push code lên GitHub
- Railway và Netlify tự động deploy
- Không cần manual deployment

### **Environment Management:**
- Development: `localhost`
- Production: `railway.app` + `netlify.app`

---

## 🚀 **Performance Optimization**

### **Frontend (Netlify):**
- ✅ Automatic code splitting
- ✅ CDN caching
- ✅ Image optimization
- ✅ Gzip compression

### **Backend (Railway):**
- ✅ Auto-scaling
- ✅ Load balancing
- ✅ Connection pooling
- ✅ Rate limiting

---

## 🔒 **Security**

### **Environment Variables:**
- JWT_SECRET is secure
- DATABASE_URL is private
- No sensitive data in code

### **CORS Configuration:**
- Only allow specific origins
- Credentials properly configured

### **HTTPS:**
- Automatic SSL certificates
- Secure connections

---

## 🎉 **Kết quả**

Sau khi hoàn thành, bạn sẽ có:

✅ **Frontend**: `https://your-app.netlify.app`  
✅ **Backend**: `https://your-app.railway.app`  
✅ **Database**: PostgreSQL trên Railway  
✅ **Auto Deploy**: Tự động deploy khi push code  
✅ **SSL Certificate**: HTTPS tự động  
✅ **CDN**: Global content delivery  
✅ **Monitoring**: Performance tracking  

### **URLs:**
- 🌐 **Website**: `https://your-app.netlify.app`
- 🔧 **API**: `https://your-app.railway.app/api`
- 📊 **Health Check**: `https://your-app.railway.app/api/health`

---

## 🚀 **Next Steps**

1. **Test thoroughly** - đảm bảo mọi tính năng hoạt động
2. **Add custom domain** - nếu muốn
3. **Set up monitoring** - error tracking
4. **Add analytics** - Google Analytics
5. **Scale up** - khi có nhiều users
6. **Add features** - notifications, sharing, etc.

---

## 📞 **Support**

Nếu gặp vấn đề:
1. Kiểm tra logs trong Railway/Netlify dashboard
2. Kiểm tra environment variables
3. Test locally trước khi deploy
4. Kiểm tra CORS configuration 