// features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";
import { api_url_v1 } from "../utils/config";
import axios from "axios";
import { updateDoctor } from "./ProfileSlice";

// Get user from localStorage if exists
const userFromStorage = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;

// ---- user LOGIN ---- //
export const userLogin = createAsyncThunk(
  "auth/userLogin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${api_url_v1}/user-login`, { email, password });

      // Save accessToken and user data
      localStorage.setItem("accessToken", res?.data?.accessToken);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      return res.data; 
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const updatePassword = createAsyncThunk(
    "auth/updatePassword",
    async ({ currentPassword, newPassword, confirmPassword }, { rejectWithValue }) => {
      try {
        const res = await api.post(`${api_url_v1}/update-password`, {
          currentPassword,
          newPassword,
          confirmPassword
        });
  
        return 
      } catch (err) {
        return rejectWithValue(
          err.response?.data?.message || "Failed to update password"
        );
      }
    }
  );

// ---- user LOGOUT ---- //
export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async (_, { rejectWithValue }) => {
      try {
        await api.post(`${api_url_v1}/logout`);
        
        // Clear localStorage
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        
        return true;
      } catch (err) {
        console.log(err);
        // Clear localStorage even if API call fails
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        return rejectWithValue("Logout failed");
      }
    }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: userFromStorage, 
    loading: false,
    error: null,
    isSuccess: false,
    accessToken:localStorage.getItem('accessToken'),
    passwordUpdateSuccess: false,
    passwordUpdateLoading: false,
    passwordUpdateError: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isSuccess = false;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    },
    clearError: (state) => {
      state.error = null;
    },
    // Update access token after refresh
    refreshAccessToken: (state, action) => {
      localStorage.setItem('accessToken', action.payload);
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
        state.isSuccess = true;
        state.error = null;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
        state.isSuccess = false;
      })
      .addCase(updatePassword.pending, (state) => {
        state.passwordUpdateLoading = true;
        state.passwordUpdateError = null;
        state.passwordUpdateSuccess = false;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.passwordUpdateLoading = false;
        state.passwordUpdateSuccess = true;
        state.passwordUpdateError = null;
        const storedUser = JSON.parse(localStorage.getItem("user")) || {};
        storedUser.updatePassword = true;
        localStorage.setItem("user", JSON.stringify(storedUser));
     
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
        state.accessToken = '';
        state.loading = false;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.user = null;
        state.loading = false;
        state.isSuccess = false;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
      })
      .addCase(updateDoctor.fulfilled, (state, action) => {
        state.user = action.payload.user; 
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      });
  },
});

export const { logout, clearError,  clearPasswordUpdate,refreshAccessToken } = authSlice.actions;

export default authSlice.reducer;