import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/users/';

// PUBLIC: Use for Signup and Login
export const publicAPI = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' }
});

// PRIVATE: Use for all protected data (Dashboard, Wallet, etc.)
const API = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' }
});

// Automatically attach the Bearer token to every private request
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;