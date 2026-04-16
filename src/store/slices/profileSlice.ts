import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ProfileState } from '../../types/profile';
import { getProfile } from '../../services/profileService';

const initialState: ProfileState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchProfile = createAsyncThunk('profile/fetch', async () => {
  const response = await getProfile();
  return response.data;
});

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch profile';
      });
  },
});

export default profileSlice.reducer;
