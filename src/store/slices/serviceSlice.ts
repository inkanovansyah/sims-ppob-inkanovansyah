import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ServiceState } from '../../types/service';
import { getServices } from '../../services/serviceService';

// State awal untuk daftar layanan PPOB
const initialState: ServiceState = {
  data: [],
  loading: false,
  error: null,
};

// Async Thunk untuk mengambil daftar layanan dari API
export const fetchServices = createAsyncThunk('services/fetch', async () => {
  const response = await getServices();
  return response.data;
});

const serviceSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Case untuk pengambilan daftar layanan
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.data = action.payload; // Simpan data layanan yang diterima dari server
        state.loading = false;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Gagal mengambil data layanan';
      });
  },
});

export default serviceSlice.reducer;
