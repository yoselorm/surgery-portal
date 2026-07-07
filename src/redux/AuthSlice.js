// features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";
import { api_url_v1 } from "../utils/config";
import axios from "axios";
import { updateDoctor } from "./ProfileSlice";

// Safe JSON parser helper
const getStoredItem = (key, isJson = false) => {
  const item = localStorage.getItem(key);
  if (!item) return null;
  return isJson ? JSON.parse(item) : item;
};

// ---- user LOGIN ---- //
export const userLogin = createAsyncThunk(
  "auth/userLogin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${api_url_v1}/user-login`, { email, password });

      // FIXED: Storing both tokens as expected by your stateless backend
      localStorage.setItem("accessToken", res?.data?.accessToken);
      localStorage.setItem("refreshToken", res?.data?.refreshToken);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      return res.data; 
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Something went wrong"
      );
    }
  }
);

// ---- update PASSWORD ---- //
export const updatePassword = createAsyncThunk(
    "auth/updatePassword",
    async ({ currentPassword, newPassword, confirmPassword }, { rejectWithValue }) => {
      try {
        const res = await api.post(`${api_url_v1}/update-password`, {
          currentPassword,
          newPassword,
          confirmPassword
        });
  
        return res.data; // Added return statement to explicitly pass success message
      } catch (err) {
        return rejectWithValue(
          err.response?.data?.error || err.response?.data?.message || "Failed to update password"
        );
      }
    }
  );

// ---- user LOGOUT ---- //
export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async (_, { rejectWithValue }) => {
      try {
        // FIXED: Passing the refresh token to the backend so it can be wiped from the database
        const refreshToken = localStorage.getItem("refreshToken");
        await api.post(`${api_url_v1}/logout`, { refreshToken });
        
        return true;
      } catch (err) {
        console.error("Logout API error:", err);
        return rejectWithValue("Logout failed");
      } finally {
        // ALWAYS wipe local tokens regardless of whether network request succeeded or timed out
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
      }
    }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: getStoredItem('user', true), 
    accessToken: getStoredItem('accessToken'),
    refreshToken: getStoredItem('refreshToken'),
    loading: false,
    error: null,
    isSuccess: false,
    passwordUpdateSuccess: false,
    passwordUpdateLoading: false,
    passwordUpdateError: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isSuccess = false;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    },
    clearError: (state) => {
      state.error = null;
    },
    // FIXED: Added missing reducer to match your bottom export
    clearPasswordUpdate: (state) => {
      state.passwordUpdateSuccess = false;
      state.passwordUpdateError = null;
    },
    // Sync tokens after token rotation interceptor fires
    refreshAccessToken: (state, action) => {
      const { accessToken, refreshToken } = action.payload;
      state.accessToken = accessToken;
      localStorage.setItem('accessToken', accessToken);
      
      if (refreshToken) {
        state.refreshToken = refreshToken;
        localStorage.setItem('refreshToken', refreshToken);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // user Login
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isSuccess = false;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isSuccess = true;
        state.error = null;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.isSuccess = false;
      })
      // Update Password
      .addCase(updatePassword.pending, (state) => {
        state.passwordUpdateLoading = true;
        state.passwordUpdateError = null;
        state.passwordUpdateSuccess = false;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.passwordUpdateLoading = false;
        state.passwordUpdateSuccess = true;
        state.passwordUpdateError = null;
        
        if (state.user) {
          state.user.updatePassword = true;
          localStorage.setItem("user", JSON.stringify(state.user));
        }
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.passwordUpdateLoading = false;
        state.passwordUpdateError = action.payload;
        state.passwordUpdateSuccess = false;
      })
      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.loading = false;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.loading = false;
        state.isSuccess = false;
      })
      // External profile updates sync
      .addCase(updateDoctor.fulfilled, (state, action) => {
        state.user = action.payload.user; 
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      });
  },
});

export const { logout, clearError, clearPasswordUpdate, refreshAccessToken } = authSlice.actions;

export default authSlice.reducer;