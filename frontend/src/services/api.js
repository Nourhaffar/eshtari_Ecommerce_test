import axios from 'axios';
const BASE_URL = import.meta.env.MODE === "development" ? 'http://localhost:5000/api' : "/api";
const apiClient = axios.create({
  baseURL: 'https://api.sari3.com/v2/index.php?route=assignment_test',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const getHomeWidgets = async () => {
  try {
    const data = await axios.get(`${BASE_URL}/home_widgets`);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch home widgets');
  }   
};

export const getProductDetail = async (productId) => {
  try {
    const data = await apiClient.get(`/product&product_id=${productId}`);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch product details');
  }
};

export const login = async (email, password) => {
  try {
    const formData = new URLSearchParams();
    formData.append('email', email);
    formData.append('password', password);
    
    const data = await apiClient.post('/login', formData);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const register = async (userData) => {
  try {
    const formData = new URLSearchParams();
    Object.keys(userData).forEach(key => {
      formData.append(key, userData[key]);
    });
    
    const data = await apiClient.post('/register', formData);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

export default {
  getHomeWidgets,
  getProductDetail,
  login,
  register
};


