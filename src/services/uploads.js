import api from './api';

export const uploadProfilePicture = async (formData) => {
  try {
    const response = await api.post('/uploads/profile-picture', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    throw error;
  }
}