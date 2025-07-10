# 🚀 Let's Do It - Todo App với Energy Bar

Một ứng dụng Todo hiện đại với tính năng Energy Bar độc đáo, giúp người dùng theo dõi tiến độ hoàn thành công việc một cách trực quan và thú vị.

## ✨ Tính năng chính

- 🔐 **Authentication** - Đăng ký/đăng nhập an toàn
- 📝 **Task Management** - Tạo, sửa, xóa, hoàn thành tasks
- ⚡ **Energy Bar** - Theo dõi tiến độ với animation đẹp
- 📊 **Statistics** - Thống kê chi tiết về tasks
- 🔍 **Search & Filter** - Tìm kiếm và lọc tasks
- 📱 **Responsive Design** - Hoạt động tốt trên mọi thiết bị
- 🎨 **Modern UI** - Giao diện đẹp với animations

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Axios** - HTTP client
- **React Router** - Navigation
- **React Hot Toast** - Notifications

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **SQL Server/PostgreSQL** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin requests
- **Helmet** - Security headers

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- SQL Server hoặc PostgreSQL
- Git

### Installation

1. **Clone repository:**
```bash
git clone https://github.com/your-username/lets-do-it.git
cd lets-do-it
```

2. **Install dependencies:**
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

3. **Configure environment:**
```bash
# Backend (.env)
SQL_USER=your_username
SQL_PASSWORD=your_password
SQL_DATABASE=your_database
SQL_SERVER=your_server
JWT_SECRET=your_super_secret_jwt_key
PORT=5000
NODE_ENV=development
```

4. **Start development servers:**
```bash
# Backend (Port 5000)
cd backend
npm run dev

# Frontend (Port 5173)
cd frontend
npm run dev
```

5. **Open browser:**
```
http://localhost:5173
```

## 🌐 Deployment

### Live Demo
- **Website**: [https://your-app.vercel.app](https://your-app.vercel.app)
- **API**: [https://your-app.railway.app/api](https://your-app.railway.app/api)

### Deploy Instructions
Xem file [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) để biết hướng dẫn chi tiết.

## 📱 Screenshots

### Dashboard
![Dashboard](screenshots/dashboard.png)

### Energy Bar
![Energy Bar](screenshots/energy-bar.png)

### Task Management
![Task Management](screenshots/task-management.png)

## 🔧 API Endpoints

### Authentication
```
POST /api/auth/register - Đăng ký
POST /api/auth/login    - Đăng nhập
GET  /api/auth/me       - Lấy thông tin user
```

### Tasks
```
GET    /api/tasks           - Lấy danh sách tasks
POST   /api/tasks           - Tạo task mới
PUT    /api/tasks/:id       - Cập nhật task
DELETE /api/tasks/:id       - Xóa task
PATCH  /api/tasks/:id/toggle - Toggle completed
```

## 🎯 Energy Bar System

Energy Bar là tính năng độc đáo của ứng dụng:

- **Empty (0-19%)**: Gray - Bắt đầu hoàn thành tasks
- **Low (20-49%)**: Orange - Tiến độ chậm
- **Medium (50-79%)**: Yellow - Tiến độ tốt
- **High (80-100%)**: Green - Tiến độ xuất sắc

Mỗi task completed sẽ tăng energy level và hiển thị animation đẹp mắt.

## 🔒 Security Features

- ✅ **JWT Authentication** - Token-based auth
- ✅ **Password Hashing** - bcryptjs
- ✅ **Rate Limiting** - 100 requests/15min
- ✅ **CORS Protection** - Cross-origin security
- ✅ **SQL Injection Prevention** - Parameterized queries
- ✅ **Input Validation** - Server-side validation

## 📊 Performance

- ✅ **Code Splitting** - Lazy loading components
- ✅ **Connection Pooling** - Database optimization
- ✅ **CDN** - Global content delivery
- ✅ **Caching** - Browser and server caching
- ✅ **Compression** - Gzip compression

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI framework
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Express.js](https://expressjs.com/) - Backend framework

## 📞 Support

- **Email**: support@letsdoit.app
- **Documentation**: [docs.letsdoit.app](https://docs.letsdoit.app)
- **Issues**: [GitHub Issues](https://github.com/your-username/lets-do-it/issues)

---

Made with ❤️ by Let's Do It Team "# LetsDoIt" 
"# WorkWithTom" 
# WorkWithTom
# WorkWithTomm
