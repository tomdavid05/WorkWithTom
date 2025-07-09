# 🚀 Hướng dẫn Deploy Project "Let's Do It!"

## 📋 Yêu cầu hệ thống

### Backend Requirements:
- Node.js 18+ 
- SQL Server Database
- Railway account (free tier available)

### Frontend Requirements:
- Node.js 18+
- Vercel account (free tier available)

## 🔧 Cài đặt ban đầu

### 1. Clone repository
```bash
git clone <your-repo-url>
cd lets-do-it
```

### 2. Cài đặt dependencies
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

## 🎯 Deploy Backend (Railway)

### Bước 1: Chuẩn bị Database
1. Tạo SQL Server database (Azure, AWS RDS, hoặc local)
2. Ghi lại connection string

### Bước 2: Setup Railway
1. Đăng ký tài khoản tại [railway.app](https://railway.app)
2. Cài đặt Railway CLI:
```bash
npm install -g @railway/cli
```

3. Login vào Railway:
```bash
railway login
```

### Bước 3: Deploy Backend
```bash
cd backend
railway init
railway up
```

### Bước 4: Cấu hình Environment Variables
Trong Railway dashboard, thêm các biến môi trường:

```env
DB_SERVER=your-sql-server.database.windows.net
DB_NAME=your-database-name
DB_USER=your-username
DB_PASSWORD=your-password
JWT_SECRET=your-super-secret-jwt-key
PORT=3000
NODE_ENV=production
```

### Bước 5: Lấy Backend URL
```bash
railway status
```
Copy URL từ output (ví dụ: `https://your-app.railway.app`)

## 🎨 Deploy Frontend (Vercel)

### Bước 1: Setup Vercel
1. Đăng ký tài khoản tại [vercel.com](https://vercel.com)
2. Cài đặt Vercel CLI:
```bash
npm install -g vercel
```

3. Login vào Vercel:
```bash
vercel login
```

### Bước 2: Cấu hình Environment Variables
Tạo file `.env.production` trong thư mục `frontend`:

```env
VITE_API_URL=https://your-backend-url.railway.app
```

### Bước 3: Deploy Frontend
```bash
cd frontend
vercel --prod
```

## 🔄 Deploy tự động

### Sử dụng script deploy
```bash
# Cấp quyền thực thi
chmod +x scripts/deploy.sh

# Chạy script deploy
./scripts/deploy.sh
```

### Deploy thủ công từng bước

#### Backend:
```bash
cd backend
railway up --detach
```

#### Frontend:
```bash
cd frontend
npm run build
vercel --prod
```

## 🔧 Cấu hình nâng cao

### CORS Configuration
Trong `backend/server.js`, đảm bảo CORS được cấu hình đúng:

```javascript
app.use(cors({
  origin: ['https://your-frontend-domain.vercel.app', 'http://localhost:5173'],
  credentials: true
}));
```

### Database Migration
Chạy script tạo bảng:

```sql
-- Users table
CREATE TABLE users (
  id INT IDENTITY(1,1) PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at DATETIME DEFAULT GETDATE()
);

-- Tasks table
CREATE TABLE tasks (
  id INT IDENTITY(1,1) PRIMARY KEY,
  user_id INT FOREIGN KEY REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  priority VARCHAR(20) DEFAULT 'medium',
  status VARCHAR(20) DEFAULT 'active',
  due_date DATETIME,
  created_at DATETIME DEFAULT GETDATE(),
  updated_at DATETIME DEFAULT GETDATE()
);
```

## 🧪 Testing Deployment

### Test Backend API
```bash
curl https://your-backend-url.railway.app/api/health
```

### Test Frontend
1. Mở URL frontend trong browser
2. Test đăng ký/đăng nhập
3. Test tạo/xóa tasks

## 🔍 Troubleshooting

### Backend Issues:
1. **Database Connection Error**: Kiểm tra connection string
2. **JWT Error**: Kiểm tra JWT_SECRET
3. **CORS Error**: Kiểm tra CORS configuration

### Frontend Issues:
1. **API Connection Error**: Kiểm tra VITE_API_URL
2. **Build Error**: Kiểm tra dependencies
3. **Routing Error**: Kiểm tra vercel.json

### Common Solutions:
```bash
# Clear cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

## 📊 Monitoring

### Railway Monitoring:
- Logs: `railway logs`
- Status: `railway status`
- Variables: `railway variables`

### Vercel Monitoring:
- Analytics: Vercel dashboard
- Logs: Vercel dashboard
- Performance: Built-in analytics

## 🔐 Security Checklist

- [ ] JWT_SECRET được set và đủ mạnh
- [ ] Database credentials được bảo vệ
- [ ] CORS được cấu hình đúng
- [ ] HTTPS được enable
- [ ] Environment variables không commit lên git

## 📈 Performance Optimization

### Backend:
- Enable compression
- Use connection pooling
- Implement caching

### Frontend:
- Code splitting
- Image optimization
- CDN usage

## 🆘 Support

Nếu gặp vấn đề:
1. Kiểm tra logs: `railway logs` hoặc Vercel dashboard
2. Verify environment variables
3. Test locally trước khi deploy
4. Check documentation của Railway và Vercel

## 🎉 Success!

Sau khi deploy thành công, bạn sẽ có:
- Backend API: `https://your-app.railway.app`
- Frontend App: `https://your-app.vercel.app`

Chia sẻ URL frontend với người dùng để họ có thể sử dụng ứng dụng! 