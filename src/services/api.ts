import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Request Interceptor: Attach token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor: Global Error Handling
API.interceptors.response.use(
  (response) => {
    // Large companies often use their own success/fail indicators in the body
    const apiData = response.data;
    
    // In Nutech API, status 0 means success
    if (apiData && typeof apiData.status !== 'undefined' && apiData.status !== 0) {
      toast.error(apiData.message || 'Terjadi kesalahan pada sistem');
    }
    
    return response;
  },
  (error: AxiosError<any>) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message || 'Network error occurred';

    // Handle session expiry
    if (status === 401) {
      toast.error('Sesi telah berakhir. Silakan login kembali.');
      localStorage.removeItem('token');
      // Redirect using window.location for hard reset in enterprise apps
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    } else {
      toast.error(message);
    }

    return Promise.reject(error);
  }
);

export default API;
