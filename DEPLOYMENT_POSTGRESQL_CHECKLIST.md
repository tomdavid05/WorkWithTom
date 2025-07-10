# ✅ PostgreSQL Deployment Checklist

## 🔧 Pre-deployment Setup

### Backend Code
- [ ] ✅ Code đã hỗ trợ PostgreSQL (db.js)
- [ ] ✅ Package.json có dependency `pg`
- [ ] ✅ Environment variables được cấu hình
- [ ] ✅ CORS settings cho production
- [ ] ✅ Health check endpoint (`/api/health`)

### Database
- [ ] ✅ PostgreSQL database đã được tạo
- [ ] ✅ Connection string đã được lấy
- [ ] ✅ SSL settings cho production

## 🌐 Platform Setup

### Render
- [ ] ✅ Tài khoản Render đã được tạo
- [ ] ✅ GitHub repository đã được connect
- [ ] ✅ Web service đã được tạo
- [ ] ✅ PostgreSQL database đã được tạo trong Render
- [ ] ✅ Environment variables đã được set:
  - [ ] `NODE_ENV=production`
  - [ ] `JWT_SECRET=your_secret_here`
  - [ ] `FRONTEND_URL=https://work-with-tom.netlify.app`
  - [ ] `DATABASE_URL=postgresql://...`

### Railway
- [ ] ✅ Tài khoản Railway đã được tạo
- [ ] ✅ GitHub repository đã được connect
- [ ] ✅ Service đã được deploy
- [ ] ✅ PostgreSQL database đã được tạo trong Railway
- [ ] ✅ Environment variables đã được set:
  - [ ] `NODE_ENV=production`
  - [ ] `JWT_SECRET=your_secret_here`
  - [ ] `FRONTEND_URL=https://work-with-tom.netlify.app`
  - [ ] `DATABASE_URL=postgresql://...`

### Heroku
- [ ] ✅ Heroku CLI đã được cài đặt
- [ ] ✅ Đã login vào Heroku
- [ ] ✅ App đã được tạo
- [ ] ✅ PostgreSQL addon đã được thêm
- [ ] ✅ Environment variables đã được set:
  - [ ] `NODE_ENV=production`
  - [ ] `JWT_SECRET=your_secret_here`
  - [ ] `FRONTEND_URL=https://work-with-tom.netlify.app`

## 🚀 Deployment Steps

### 1. Code Preparation
- [ ] ✅ Code đã được push lên GitHub
- [ ] ✅ Không có lỗi syntax
- [ ] ✅ Dependencies đã được cài đặt
- [ ] ✅ Build script hoạt động

### 2. Database Setup
- [ ] ✅ PostgreSQL database đã được tạo
- [ ] ✅ Connection string đã được test
- [ ] ✅ Tables sẽ được tạo tự động
- [ ] ✅ SSL connection cho production

### 3. Environment Configuration
- [ ] ✅ `NODE_ENV=production`
- [ ] ✅ `JWT_SECRET` đủ mạnh (32+ ký tự)
- [ ] ✅ `FRONTEND_URL` đúng
- [ ] ✅ `DATABASE_URL` đúng format

### 4. Deploy
- [ ] ✅ Trigger deployment
- [ ] ✅ Build process thành công
- [ ] ✅ Application start thành công
- [ ] ✅ Database connection thành công

## 🔍 Post-deployment Testing

### 1. Health Check
- [ ] ✅ `GET /api/health` trả về 200
- [ ] ✅ Response có timestamp
- [ ] ✅ Database connection OK

### 2. API Testing
- [ ] ✅ `POST /api/auth/register` hoạt động
- [ ] ✅ `POST /api/auth/login` hoạt động
- [ ] ✅ `GET /api/tasks` hoạt động (với auth)
- [ ] ✅ `POST /api/tasks` hoạt động
- [ ] ✅ CORS headers đúng

### 3. Database Testing
- [ ] ✅ Tables được tạo tự động
- [ ] ✅ User registration tạo record
- [ ] ✅ Task creation hoạt động
- [ ] ✅ Foreign key constraints hoạt động

### 4. Security Testing
- [ ] ✅ Rate limiting hoạt động
- [ ] ✅ JWT authentication hoạt động
- [ ] ✅ Password hashing hoạt động
- [ ] ✅ CORS protection hoạt động

## 📊 Monitoring

### 1. Logs
- [ ] ✅ Application logs accessible
- [ ] ✅ Database connection logs OK
- [ ] ✅ Error logs được capture
- [ ] ✅ Performance logs available

### 2. Metrics
- [ ] ✅ Response time < 500ms
- [ ] ✅ Uptime > 99%
- [ ] ✅ Database connection pool OK
- [ ] ✅ Memory usage stable

### 3. Alerts
- [ ] ✅ Error rate alerts configured
- [ ] ✅ Database connection alerts
- [ ] ✅ Performance degradation alerts
- [ ] ✅ Uptime monitoring active

## 🔧 Troubleshooting

### Common Issues
- [ ] ❌ Database connection failed
  - [ ] Kiểm tra `DATABASE_URL` format
  - [ ] Kiểm tra SSL settings
  - [ ] Kiểm tra firewall/network

- [ ] ❌ CORS errors
  - [ ] Kiểm tra `FRONTEND_URL`
  - [ ] Kiểm tra CORS configuration
  - [ ] Test với Postman

- [ ] ❌ JWT errors
  - [ ] Kiểm tra `JWT_SECRET`
  - [ ] Kiểm tra token format
  - [ ] Test authentication flow

- [ ] ❌ Rate limiting
  - [ ] Kiểm tra request limits
  - [ ] Test với multiple requests
  - [ ] Monitor rate limit headers

## ✅ Final Checklist

### Before Going Live
- [ ] ✅ All tests passing
- [ ] ✅ Database backup configured
- [ ] ✅ Monitoring alerts active
- [ ] ✅ Documentation updated
- [ ] ✅ Team notified
- [ ] ✅ Rollback plan ready

### Post-Launch
- [ ] ✅ Monitor for 24 hours
- [ ] ✅ Check error rates
- [ ] ✅ Verify user registration
- [ ] ✅ Test all features
- [ ] ✅ Update frontend API URL
- [ ] ✅ Announce deployment

---

**Status**: 🚀 Ready for deployment!
**Last Updated**: $(date)
**Next Review**: $(date -d "+1 week") 