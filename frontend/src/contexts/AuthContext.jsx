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
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  
  // Thêm useEffect để đảm bảo baseURL luôn được set
  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    axios.defaults.baseURL = apiUrl;
  }, []);

  // Thêm useEffect để đảm bảo baseURL luôn được set
  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    axios.defaults.baseURL = apiUrl;
  }, []);

  // Thêm useEffect để đảm bảo baseURL luôn được set
  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    axios.defaults.baseURL = apiUrl;
  }, []);

  // Thêm useEffect để đảm bảo baseURL luôn được set
  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    axios.defaults.baseURL = apiUrl;
  }, []);

  // Thêm useEffect để đảm bảo baseURL luôn được set
  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    axios.defaults.baseURL = apiUrl;
  }, []);

  // Add axios interceptor for authentication errors
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Token expired or invalid
          setUser(null);
          setAuthToken(null);
          const currentPath = window.location.pathname;
          if (!['/login', '/register'].includes(currentPath)) {
            // Sử dụng setTimeout để tránh vấn đề với navigate trong async context
            setTimeout(() => {
              navigate('/login', { replace: true });
            }, 5000);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [navigate]); // Thêm navigate vào dependency array

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

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get('/auth/me');
      setUser(response.data.data.user);
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
      setAuthToken(null);
    } finally {
      setLoading(false);
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
  }, []); // Empty dependency array vì chỉ chạy một lần khi mount

  // Redirect to login if not authenticated and not on auth pages
  useEffect(() => {
    if (!loading && !user) {
      const currentPath = window.location.pathname;
      if (!['/login', '/register'].includes(currentPath)) {
        // Sử dụng setTimeout để tránh vấn đề với navigate trong async context
        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 5000);
      }
    }
  }, [loading, user, navigate]);

  const register = async (userData) => {
    try {
      // Xóa token cũ trước khi đăng ký
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];

      // Đăng ký
      const response = await axios.post('/auth/register', userData);
      const { user, token } = response.data.data;
      
      // Set token và user ngay lập tức
      setAuthToken(token);
      setUser(user);
     
      toast.success('Registration successful!');
      
      // Navigate ngay lập tức
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 2000);
      
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

      // Đăng nhập
      const response = await axios.post('/auth/login', credentials);
      const { user, token } = response.data.data;
      
      // Set token và user ngay lập tức
      setAuthToken(token);
      setUser(user);
      
      toast.success('Login successful!');
      
      // Navigate ngay lập tức
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 2000);
      
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
    // Sử dụng setTimeout để tránh vấn đề với navigate
    setTimeout(() => {
      navigate('/login', { replace: true });
    }, 2000);
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