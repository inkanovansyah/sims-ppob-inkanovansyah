import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BannerState } from '../../types/banner';
import { getBanners } from '../../services/bannerService';

// State awal untuk daftar banner promosi
const initialState: BannerState = {
  data: [],
  loading: false,
  error: null,
};

// Async Thunk untuk mengambil data banner dari API
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
      // Case untuk pengambilan data banner
      .addCase(fetchBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.data = action.payload; // Simpan daftar banner yang diterima dari server
        state.loading = false;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Gagal mengambil data banner';
      });
  },
});

export default bannerSlice.reducer;
