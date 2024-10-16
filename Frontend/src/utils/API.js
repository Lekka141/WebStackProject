import axios from 'axios';

/** Create an Axios instance */
const API = axios.create({
  baseURL: 'https://api.yourbackend.com',  /* Replace with your actual backend URL */
  timeout: 10000,  /* 10 seconds timeout */
});

/** Add request interceptor for including authorization token */
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/** Add response interceptor for global error handling */
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = '/login'; /* Redirect to login if unauthorized */
    }
    return Promise.reject(error);
  }
);

/** Function for login */
export const login = async (email, password) => {
  try {
    const response = await API.post('/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

/** Function for GET requests */
export const get = async (endpoint, params = {}) => {
  try {
    const response = await API.get(endpoint, { params });
    return response.data;
  } catch (error) {
    console.error(`GET request to ${endpoint} failed:`, error);
    throw error;
  }
};

/** Function for POST requests */
export const post = async (endpoint, data) => {
  try {
    const response = await API.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error(`POST request to ${endpoint} failed:`, error);
    throw error;
  }
};

/** Function to fetch specific data for the dashboard */
export const getData = async () => {
  return await get('/dashboard-data');
};

export default API;
