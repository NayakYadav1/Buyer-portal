import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
    console.log('Full response:', response);
    if (response.data && response.data.token) {
      console.log('Token received:', response.data.token);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      console.log('Data saved to localStorage');
      return response.data;
    } else {
      console.error('No token in response:', response.data);
      throw new Error('No token received from server');
    }
  } catch (error) {
    console.error('Full error object:', error);
    console.error('Error response:', error.response);
    throw error.response?.data?.message || error.message || 'Login failed. Please check your credentials.';
  }
};

export const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const registerUser = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, { name, email, password });
    if (response.data && response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data;
    } else {
      throw new Error('No token received from server');
    }
  } catch (error) {
    console.error('Registration error:', error);
    throw error.response?.data?.message || error.message || 'Registration failed. Please try again.';
  }
};

export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

export const getFavorites = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/favorites`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Get favorites error:', error);
    throw error.response?.data?.message || error.message || 'Failed to load favorites.';
  }
};

export const addFavorite = async (propertyId) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/favorites`,
      { propertyId },
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error('Add favorite error:', error);
    throw error.response?.data?.message || error.message || 'Failed to add favorite.';
  }
};

export const removeFavorite = async (propertyId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/favorites/${propertyId}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Remove favorite error:', error);
    throw error.response?.data?.message || error.message || 'Failed to remove favorite.';
  }
};