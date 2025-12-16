import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";
import { api_url_v1 } from "../utils/config";

export const updateDoctor = createAsyncThunk(
  "doctor/updateDoctor",
  async ({ id, data }, { rejectWithValue }) => {
    console.log(data);
    try {
      const res = await api.post(`${api_url_v1}/user/${id}`, data);
      
      // Update localStorage with new user data
      if (res.data.user) {
        localStorage.setItem('user', JSON.stringify(res.data.user));
      }
      
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update doctor"
      );
    }
  }
);

const doctorSlice = createSlice({
  name: "doctor",
  initialState: {
    doctor: JSON.parse(localStorage.getItem('user')) || null,
    loading: false,
    error: null,
  },
  reducers: {
    clearDoctorError: (state) => {
      state.error = null;
    },
    setDoctor: (state, action) => {
      state.doctor = action.payload.user;
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    clearDoctor: (state) => {
      state.doctor = null;
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      /* ---- UPDATE ---- */
      .addCase(updateDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.doctor = action.payload.user;
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(updateDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearDoctorError, setDoctor, clearDoctor } = doctorSlice.actions;
export default doctorSlice.reducer;