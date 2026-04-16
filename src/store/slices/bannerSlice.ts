import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BannerState } from '../../types/banner';
import { getBanners } from '../../services/bannerService';

const initialState: BannerState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchBanners = createAsyncThunk('banners/fetch', async () => {
  const response = await getBanners();
  return response.data;
});

const bannerSlice = createSlice({
  name: 'banners',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch banners';
      });
  },
});

export default bannerSlice.reducer;
