// src/services/api.js
import axios from 'axios';
import { getToken, removeToken } from './auth'; // Only need these now

const api = axios.create({
  baseURL: 'http://localhost:5000/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getToken(); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.warn('Unauthorized request. Token might be expired or invalid. Logging out...');
      removeToken();
    }
    return Promise.reject(error);
  }
);

export default api;