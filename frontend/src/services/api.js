import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/users';

// 1. PUBLIC API: Use this for Signup and Login ONLY
// It has NO interceptors, so it never sends a 401-triggering header.
export const publicAPI = axios.create({
    baseURL: BASE_URL,
});

// 2. PRIVATE API: Use this for Dashboard, Wallet, Settings, etc.
const API = axios.create({
    baseURL: BASE_URL,
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

export default API;