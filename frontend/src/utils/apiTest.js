import axios from 'axios';

export const testApiConnection = async () => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    console.log('Testing API connection to:', apiUrl);
    
    const response = await axios.get(`${apiUrl}/health`, {
      timeout: 5000
    });
    
    console.log('✅ API connection successful:', response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('❌ API connection failed:', error);
    return { 
      success: false, 
      error: error.message,
      code: error.code,
      status: error.response?.status 
    };
  }
};

export const testAuthEndpoint = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return { success: false, error: 'No token found' };
    }

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    const response = await axios.get(`${apiUrl}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      timeout: 5000
    });
    
    console.log('✅ Auth endpoint test successful:', response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('❌ Auth endpoint test failed:', error);
    return { 
      success: false, 
      error: error.message,
      status: error.response?.status,
      data: error.response?.data
    };
  }
}; 