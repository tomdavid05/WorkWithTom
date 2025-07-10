# ✅ Checklist: Kết nối Netlify với Render

## 🚀 Bước 1: Deploy Backend lên Render

### Render Setup
- [ ] ✅ Tạo tài khoản Render
- [ ] ✅ Connect GitHub repository
- [ ] ✅ Tạo Web Service cho backend
- [ ] ✅ Cấu hình build settings:
  - [ ] Build Command: `npm install`
  - [ ] Start Command: `npm start`
  - [ ] Plan: Free
    
### PostgreSQL Database
- [ ] ✅ Tạo PostgreSQL database trong Render
- [ ] ✅ Copy connection string
- [ ] ✅ Test database connection

### Environment Variables (Render)
- [ ] ✅ `NODE_ENV=production`
- [ ] ✅ `JWT_SECRET=your_super_secret_jwt_key_here`
- [ ] ✅ `FRONTEND_URL=https://work-with-tom.netlify.app`
- [ ] ✅ `DATABASE_URL=postgresql://username:password@host:port/database`

### Backend Deployment
- [ ] ✅ Deploy thành công
- [ ] ✅ Health check endpoint hoạt động
- [ ] ✅ Lấy backend URL (ví dụ: https://lets-do-it-backend.onrender.com)

## 🌐 Bước 2: Cập nhật Frontend

### Local Environment
- [ ] ✅ Tạo file `.env` trong `frontend/`
- [ ] ✅ Cập nhật `VITE_API_URL` cho development
- [ ] ✅ Test local connection

### Netlify Environment Variables
- [ ] ✅ Truy cập Netlify dashboard
- [ ] ✅ Vào Site settings > Environment variables
- [ ] ✅ Thêm biến `VITE_API_URL`
- [ ] ✅ Set value: `https://lets-do-it-backend.onrender.com/api`

### Code Updates
- [ ] ✅ Cập nhật AuthContext.jsx
- [ ] ✅ Cập nhật netlify.toml
- [ ] ✅ Commit và push code
- [ ] ✅ Trigger Netlify deploy

## 🔍 Bước 3: Testing

### Backend Testing
- [ ] ✅ Health check: `GET /api/health`
- [ ] ✅ Registration: `POST /api/auth/register`
- [ ] ✅ Login: `POST /api/auth/login`
- [ ] ✅ Tasks: `GET /api/tasks` (với auth)

### Frontend Testing
- [ ] ✅ Website load thành công
- [ ] ✅ Registration form hoạt động
- [ ] ✅ Login form hoạt động
- [ ] ✅ Dashboard load sau login
- [ ] ✅ Task creation hoạt động
- [ ] ✅ Task list hiển thị

### Connection Testing
- [ ] ✅ Không có lỗi CORS
- [ ] ✅ Network requests thành công
- [ ] ✅ Authentication flow hoạt động
- [ ] ✅ Database operations thành công

## 🔧 Troubleshooting

### CORS Issues
- [ ] ❌ Lỗi CORS trong console
  - [ ] Kiểm tra `FRONTEND_URL` trong Render
  - [ ] Đảm bảo URL đúng format
  - [ ] Restart Render service

### API Connection Issues
- [ ] ❌ Frontend không kết nối được backend
  - [ ] Kiểm tra `VITE_API_URL` trong Netlify
  - [ ] Test backend health check
  - [ ] Kiểm tra network connectivity

### Database Issues
- [ ] ❌ Database connection failed
  - [ ] Kiểm tra `DATABASE_URL` format
  - [ ] Test database connection
  - [ ] Kiểm tra SSL settings

### Authentication Issues
- [ ] ❌ Login/Register không hoạt động
  - [ ] Kiểm tra JWT_SECRET
  - [ ] Test API endpoints
  - [ ] Kiểm tra token format

## 📊 Monitoring

### Render Dashboard
- [ ] ✅ Logs accessible
- [ ] ✅ Database connections OK
- [ ] ✅ Response times < 500ms
- [ ] ✅ Error rate < 1%

### Netlify Dashboard
- [ ] ✅ Deploy status: Success
- [ ] ✅ Environment variables set
- [ ] ✅ Build logs clean
- [ ] ✅ Site performance OK

### Browser Console
- [ ] ✅ No CORS errors
- [ ] ✅ Network requests successful
- [ ] ✅ Authentication working
- [ ] ✅ No JavaScript errors

## 🎯 Final Verification

### End-to-End Testing
- [ ] ✅ User registration flow
- [ ] ✅ User login flow
- [ ] ✅ Task creation flow
- [ ] ✅ Task management flow
- [ ] ✅ Logout flow

### Performance Testing
- [ ] ✅ Page load time < 3s
- [ ] ✅ API response time < 500ms
- [ ] ✅ Database queries optimized
- [ ] ✅ No memory leaks

### Security Testing
- [ ] ✅ JWT tokens secure
- [ ] ✅ Password hashing working
- [ ] ✅ CORS properly configured
- [ ] ✅ Rate limiting active

## ✅ Success Criteria

### Backend (Render)
- [ ] ✅ Deployed and accessible
- [ ] ✅ Database connected
- [ ] ✅ API endpoints working
- [ ] ✅ CORS configured
- [ ] ✅ Environment variables set

### Frontend (Netlify)
- [ ] ✅ Deployed and accessible
- [ ] ✅ Environment variables set
- [ ] ✅ API URL configured
- [ ] ✅ Authentication working
- [ ] ✅ All features functional

### Connection
- [ ] ✅ Frontend ↔ Backend communication
- [ ] ✅ Backend ↔ Database communication
- [ ] ✅ No CORS errors
- [ ] ✅ Secure authentication
- [ ] ✅ Real-time data sync

## 🚀 Go Live Checklist

### Pre-Launch
- [ ] ✅ All tests passing
- [ ] ✅ Performance optimized
- [ ] ✅ Security verified
- [ ] ✅ Documentation updated
- [ ] ✅ Team notified

### Post-Launch
- [ ] ✅ Monitor for 24 hours
- [ ] ✅ Check error rates
- [ ] ✅ Verify user flows
- [ ] ✅ Performance monitoring
- [ ] ✅ User feedback collection

---

**Status**: 🔗 Ready to connect!
**Backend URL**: https://lets-do-it-backend.onrender.com
**Frontend URL**: https://work-with-tom.netlify.app
**Last Updated**: $(date) 