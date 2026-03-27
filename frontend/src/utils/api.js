import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Login failed. Please check your credentials.';
  }
};

export const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const registerUser = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, { name, email, password });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Registration failed. Please try again.';
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
    throw error.response?.data?.message || 'Failed to load favorites.';
  }
};

export const addFavorite = async (propertyId) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/favorites`,
      { title, address, price },
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to add favorite.';
  }
};

export const removeFavorite = async (propertyId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/favorites/${id}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to remove favorite.';
  }
};