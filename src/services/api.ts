import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Interceptor Permintaan: Menambahkan token JWT ke header Authorization untuk setiap request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor Respon: Penanganan error global dan validasi status API
API.interceptors.response.use(
  (response) => {
    // Data API dari Nutech biasanya memiliki struktur { status, message, data }
    const apiData = response.data;
    
    // Status 0 di API Nutech menandakan sukses secara bisnis logic
    if (apiData && typeof apiData.status !== 'undefined' && apiData.status !== 0) {
      toast.error(apiData.message || 'Terjadi kesalahan pada sistem');
    }
    
    return response;
  },
  (error: AxiosError<any>) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message || 'Error jaringan terjadi';

    // Menangani sesi yang kedaluwarsa (401 Unauthorized)
    if (status === 401) {
      toast.error('Sesi telah berakhir. Silakan login kembali.');
      localStorage.removeItem('token');
      // Redirect paksa ke login jika sesi habis
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
