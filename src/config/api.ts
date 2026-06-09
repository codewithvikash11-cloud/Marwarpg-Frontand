import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to inject tokens (Fallback if not using cookies exclusively)
api.interceptors.request.use((config) => {
  const token = Cookies.get('student_token') || Cookies.get('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Interceptor to handle 401s
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove('student_token');
      Cookies.remove('admin_token');
      if (typeof window !== 'undefined') {
        window.location.href = '/student/login'; // Redirect to login on generic 401
      }
    }
    return Promise.reject(error);
  }
);

export default api;
