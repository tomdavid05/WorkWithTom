import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Configure axios defaults
  axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  // Set auth token on axios headers
  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  };

  // Check if user is logged in on app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      checkAuthStatus();
    } else {
      setLoading(false);
      delete axios.defaults.headers.common['Authorization'];
    }
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get('/auth/me');
      setUser(response.data.data.user);
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
      setAuthToken(null);
      // Chỉ redirect nếu không phải đang ở trang login/register
      if (!['/login', '/register'].includes(window.location.pathname)) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      // Xóa token cũ trước khi đăng ký
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];

      // Tạo một axios instance riêng cho auth
      const axiosAuth = axios.create({
        baseURL: import.meta.env.VITE_API_URL
      });

      // Đăng ký
      const response = await axiosAuth.post('/auth/register', userData);
      const { user, token } = response.data.data;
      
      setUser(user);
      setAuthToken(token);
     
      toast.success('Registration successful!');
      navigate('/dashboard');
      window.location.reload(); // Reload lại trang để đồng bộ token cho mọi context
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
      return { success: false, message };
    }
  };

  const login = async (credentials) => {
    try {
      // Xóa token cũ trước khi đăng nhập
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];

      // Tạo một axios instance riêng cho auth
      const axiosAuth = axios.create({
        baseURL: import.meta.env.VITE_API_URL
      });

      // Đăng nhập
      const response = await axiosAuth.post('/auth/login', credentials);
      const { user, token } = response.data.data;
      
      setUser(user);
      setAuthToken(token);
      
      toast.success('Login successful!');
      navigate('/dashboard');
      window.location.reload(); // Reload lại trang để đồng bộ token cho mọi context
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
      return { success: false, message };
    }
  };

  const logout = () => {
    setUser(null);
    setAuthToken(null);
    navigate('/login');
    toast.success('Logged out successfully');
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 