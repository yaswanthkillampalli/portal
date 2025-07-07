import api from './api'   
const TOKEN_KEY = 'authToken';

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    if (response.data && response.data.token) {
      setToken(response.data.token);
      return response.status;
    }
    return false;
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
    throw error;
  }
};