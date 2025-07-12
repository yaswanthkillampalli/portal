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

export const changePassword = async (credentials) => {
  try {
    console.log("Credentials sent to backend:", credentials);
    if (credentials.reEnterNewPassword !== credentials.newPassword) {
      const error = new Error('New password and re-entered password do not match.');
      error.response = { data: { message: error.message } }; // Mimic axios error structure for consistent error handling
      throw error;
    }

    const response = await api.put('/password/change-password', {
      currentPassword: credentials.oldPassword,
      newPassword: credentials.newPassword 
    }); 
    
    console.log("Backend response:", response);

    if (response.data && response.data.message) { 
      const token = response.data.token;
      setToken(token);
      return { success: true, message: response.data.message };
    }
    
    return { success: true, message: 'Password changed successfully!' };

  } catch (error) {
    console.error('Change password failed:', error.response?.data?.message || error.message);
    throw error.response?.data?.message || 'An unexpected error occurred.'; 
  }
};