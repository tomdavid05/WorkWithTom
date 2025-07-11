import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { useEffect } from 'react';
import { useTasks } from './contexts/TaskContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import LoadingSpinner from './components/LoadingSpinner';
import { ThemeProvider } from './contexts/ThemeContext';
import './i18n';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

function App() {
  const { user, loading, isAuthenticated } = useAuth();
  const { fetchTasks } = useTasks();

  // Fetch tasks when user is authenticated and not loading
  useEffect(() => {
    if (isAuthenticated && user && !loading) {
      // Thêm delay nhỏ để đảm bảo auth state đã ổn định
      const timer = setTimeout(() => {
        fetchTasks();
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, user, loading]); // Loại bỏ fetchTasks khỏi dependencies để tránh infinite loop

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:bg-[#282a36]">
          <Routes>
            <Route 
              path="/login" 
              element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} 
            />
            <Route 
              path="/register" 
              element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />} 
            />
            <Route 
              path="/dashboard" 
              element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/" 
              element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} 
            />
          </Routes>
        </div>
      </ThemeProvider>
    </I18nextProvider>
  );
}

export default App; 