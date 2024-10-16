import axios from 'axios';

const API = axios.create({
  baseURL: 'https://api.yourbackend.com', /* Replace with your backend URL */
});

export const login = (email, password) => API.post('/login', { email, password });

export default API;
