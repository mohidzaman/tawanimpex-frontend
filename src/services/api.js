// src/services/api.js
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 35000, // 35s — allows backend's 20s DB polling wait + network overhead
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('ti_admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Global error handler
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('ti_admin_token');
      window.location.href = '/admin/login';
    }
    // Provide a readable message for timeout errors
    if (err.code === 'ECONNABORTED' || err.message?.includes('timeout')) {
      err.friendlyMessage = 'Request timed out. The server may be starting up — please try again in a moment.';
    }
    return Promise.reject(err);
  }
);

export default api;
