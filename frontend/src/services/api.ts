import axios from "axios";

// =========================
// BASE URL
// =========================
const API_BASE_URL = "http://127.0.0.1:8000/api";
const USERS_URL = `${API_BASE_URL}/users`;

// =========================
// TYPES (optional but good for TS)
// =========================
type Token = string | null;

// =========================
// PUBLIC API (Login / Signup)
// =========================
export const publicAPI = axios.create({
  baseURL: USERS_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// =========================
// PRIVATE API (Authenticated Requests)
// =========================
const API = axios.create({
  baseURL: USERS_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// =========================
// JWT INTERCEPTOR
// =========================
API.interceptors.request.use(
  (config) => {
    const token: Token = localStorage.getItem("access_token");

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// =========================
// EXPORT DEFAULT PRIVATE API
// =========================
export default API;