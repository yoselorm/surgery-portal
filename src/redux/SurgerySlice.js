import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';
import { api_url_v1 } from '../utils/config';

// Helper to safely extract backend error messages cleanly
const getErrorMessage = (err) => {
  if (err.response?.data) {
    return err.response.data.message || err.response.data.error || JSON.stringify(err.response.data.errors);
  }
  return err.message || "Something went wrong";
};

// 1. Create a new surgery
export const createSurgery = createAsyncThunk(
  'surgery/create',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post(`${api_url_v1}/surgery`, payload);
      return res.data.surgery; // Extracts the nested surgery document
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

// 2. Update existing surgery details
export const updateSurgery = createAsyncThunk(
  'surgery/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.post(`${api_url_v1}/update-surgery/${id}`, data);
      return res.data.surgery; // Extracts the freshly updated doc mapping
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

// 3. Fetch all surgeries (With active backend query handling: page, limit, status, doctor, procedure)
export const fetchSurgeries = createAsyncThunk(
  'surgery/fetchAll',
  async (filters = {}, { rejectWithValue }) => {
    try {
      // Pass pagination and filter criteria down directly to the req.query parameters map
      const res = await api.get(`${api_url_v1}/surgery/my`, {
        params: {
          status: filters.status,
          doctor: filters.doctor,
          procedure: filters.procedure,
          page: filters.page || 1,
          limit: filters.limit || 10
        }
      });
      
      // Returns the matching pagination layout details { total, page, pages, data }
      return res.data; 
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

// 4. Fetch surgeries bound to a specific doctor
export const fetchSurgeriesByDoctor = createAsyncThunk(
  'surgery/fetchByDoctor',
  async (doctorId, { rejectWithValue }) => {
    try {
      const res = await api.get(`${api_url_v1}/surgeries/doctor/${doctorId}`);
      return res.data; // Contains unique meta properties: { count, doctor, data }
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

// 5. Fetch single surgery by ID
export const fetchSurgeryById = createAsyncThunk(
  'surgery/fetchOne',
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`${api_url_v1}/user-surgery/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);


const surgerySlice = createSlice({
  name: 'surgery',
  initialState: {
    surgeries: [],            // Array containing filtered surgical data entries
    totalSurgeriesCount: 0,    // Meta parameter mapping backend total field count
    totalPages: 1,            // Dynamic calculation threshold from pagination data payload
    currentPage: 1,           // Current active page tracking reference
    currentSurgery: null,
    currentDoctorInfo: null,  // Holds dynamic metadata context safely decoupled from main listings array
    loading: false,
    error: null,
    success: false,
  },

  reducers: {
    clearSurgeryError(state) {
      state.error = null;
    },
    clearSurgerySuccess(state) {
      state.success = false;
    },
    clearCurrentSurgery(state) {
      state.currentSurgery = null;
      state.currentDoctorInfo = null;
    },
  },

  extraReducers: (builder) => {
    builder
      /* CREATE SURGERY */
      .addCase(createSurgery.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createSurgery.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.surgeries.unshift(action.payload);
      })
      .addCase(createSurgery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* UPDATE SURGERY */
      .addCase(updateSurgery.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateSurgery.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.surgeries = state.surgeries.map((s) =>
          s._id === action.payload._id ? action.payload : s
        );

        if (state.currentSurgery?._id === action.payload._id) {
          state.currentSurgery = action.payload;
        }
      })
      .addCase(updateSurgery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* FETCH ALL (PAGINATED & FILTERED) */
      .addCase(fetchSurgeries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSurgeries.fulfilled, (state, action) => {
        state.loading = false;
        // Map data arrays and structural meta attributes coming from your backend getAllSurgeries endpoint cleanly
        state.surgeries = action.payload.data || [];
        state.totalSurgeriesCount = action.payload.total || 0;
        state.currentPage = action.payload.page || 1;
        state.totalPages = action.payload.pages || 1;
      })
      .addCase(fetchSurgeries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* FETCH BY DOCTOR ID */
      .addCase(fetchSurgeriesByDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSurgeriesByDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.surgeries = action.payload.data || [];
        state.currentDoctorInfo = action.payload.doctor || null;
      })
      .addCase(fetchSurgeriesByDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* FETCH SINGLE SURGERY BY ID */
      .addCase(fetchSurgeryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSurgeryById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSurgery = action.payload;
      })
      .addCase(fetchSurgeryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearSurgeryError,
  clearSurgerySuccess,
  clearCurrentSurgery,
} = surgerySlice.actions;

export default surgerySlice.reducer;