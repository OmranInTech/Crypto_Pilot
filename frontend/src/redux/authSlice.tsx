// src/redux/authSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../services/api";
import axios from "axios";

interface AuthState {
  user: { username?: string; email?: string } | null;
  access_token: string | null;
  refresh_token: string | null;
  loading: boolean;
  error: string | null;
}

interface SignupPayload {
  name?: string;
  username?: string;
  email: string;
  password: string;
  password2: string;
}

interface LoginPayload {
  email?: string;
  username?: string;
  password: string;
}

interface AuthResponse {
  user: { username?: string; email?: string };
  refresh: string;
  access: string;
}

const extractErrorMessage = (err: unknown): string => {
  if (axios.isAxiosError(err) && err.response?.data) {
    const data = err.response.data as { detail?: string; message?: string };
    return data.detail || data.message || "Something went wrong";
  }
  return "Something went wrong";
};

const initialState: AuthState = {
  user: null,
  access_token: localStorage.getItem("access_token") || null,
  refresh_token: localStorage.getItem("refresh_token") || null,
  loading: false,
  error: null,
};

// Signup Thunk
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (userData: SignupPayload, { rejectWithValue }) => {
    try {
      const payload = {
        ...userData,
        username: userData.username ?? userData.name,
      };
      const res = await API.post<AuthResponse>("users/signup/", payload);
      return res.data;
    } catch (err: unknown) {
      return rejectWithValue(extractErrorMessage(err));
    }
  }
);

// Login Thunk
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData: LoginPayload, { rejectWithValue }) => {
    try {
      const payload = {
        ...userData,
        username: userData.username ?? userData.email,
      };
      const res = await API.post<AuthResponse>("users/login/", payload);
      return res.data;
    } catch (err: unknown) {
      return rejectWithValue(extractErrorMessage(err));
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.access_token = null;
      state.refresh_token = null;
      state.error = null;
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signupUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.access_token = action.payload.access;
        state.refresh_token = action.payload.refresh;
        localStorage.setItem("access_token", action.payload.access);
        localStorage.setItem("refresh_token", action.payload.refresh);
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Signup failed";
      })
      // Login
      .addCase(loginUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.access_token = action.payload.access;
        state.refresh_token = action.payload.refresh;
        localStorage.setItem("access_token", action.payload.access);
        localStorage.setItem("refresh_token", action.payload.refresh);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string" ? action.payload : "Login failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;