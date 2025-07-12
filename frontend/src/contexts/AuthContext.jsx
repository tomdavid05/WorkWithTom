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
  console.log('API URL:', apiUrl);
  axios.defaults.baseURL = apiUrl;
  axios.defaults.timeout = 15000; // Increased to 15 seconds
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  
  // Add retry logic for failed requests
  axios.defaults.retry = 3;
  axios.defaults.retryDelay = 1000;

  // Set auth token on axios headers
  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
      console.log('Token set successfully');
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
      console.log('Token removed');
    }
  };

  // Setup axios interceptors
  useEffect(() => {
    // Request interceptor
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    const responseInterceptor = axios.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;
        
        // If error is 401 and we haven't already tried to refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          
          // Clear token and user data
          setUser(null);
          setAuthToken(null);
          
          // Only redirect to login if we're not already on login page
          if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
            navigate('/login', { replace: true });
            toast.error('Session expired. Please login again.');
          }
        }
        
        return Promise.reject(error);
      }
    );

    // Cleanup interceptors on unmount
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate]);

  // Check if user is logged in on app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      checkAuthStatus();
    } else {
      setLoading(false);
    }
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get('/auth/me');
      setUser(response.data.data.user);
    } catch (error) {
      setUser(null);
      setAuthToken(null);
      // Không để loading mãi
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post('/auth/register', userData);
      const { user, token } = response.data.data;
      
      setAuthToken(token);
      setUser(user);
     
      toast.success('Registration successful!');
      navigate('/dashboard', { replace: true });
      
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
      return { success: false, message };
    }
  };

  const login = async (credentials) => {
    try {
      const response = await axios.post('/auth/login', credentials);
      const { user, token } = response.data.data;
      
      setAuthToken(token);
      setUser(user);
      
      toast.success('Login successful!');
      navigate('/dashboard', { replace: true });
      
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
    navigate('/login', { replace: true });
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