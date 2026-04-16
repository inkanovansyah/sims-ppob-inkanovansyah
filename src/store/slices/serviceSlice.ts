import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ServiceState } from '../../types/service';
import { getServices } from '../../services/serviceService';

const initialState: ServiceState = {
  data: [],
  loading: false,
  error: null,
};

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
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch services';
      });
  },
});

export default serviceSlice.reducer;
