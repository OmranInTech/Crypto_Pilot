import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/users/";

// =========================
// PUBLIC API (Login / Signup)
// =========================
export const publicAPI = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// =========================
// PRIVATE API (Protected Routes)
// =========================
const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// =========================
// INTERCEPTOR (Attach JWT Token)
// =========================
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");

    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default API;