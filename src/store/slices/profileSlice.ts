import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ProfileState } from '../../types/profile';
import { getProfile, updateProfile, updateProfileImage } from '../../services/profileService';

const initialState: ProfileState = {
  data: null,
  loading: false,
  error: null,
};

// Async Thunk untuk mengambil data profil user
export const fetchProfile = createAsyncThunk('profile/fetch', async () => {
  const response = await getProfile();
  return response.data;
});

// Async Thunk untuk memperbarui informasi dasar profil (nama)
export const updateProfileInfo = createAsyncThunk(
  'profile/updateInfo',
  async (data: { first_name: string; last_name: string }) => {
    const response = await updateProfile(data);
    return response.data;
  }
);

// Async Thunk untuk mengunggah dan memperbarui foto profil
export const uploadProfileImage = createAsyncThunk(
  'profile/updateImage',
  async (file: File) => {
    const response = await updateProfileImage(file);
    return response.data;
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    // Action untuk membersihkan error pada state profil
    clearProfileError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Case untuk pengambilan profil
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
      })
      // Case untuk pembaruan info profil
      .addCase(updateProfileInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfileInfo.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(updateProfileInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update profile';
      })
      // Case untuk unggah foto profil
      .addCase(uploadProfileImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadProfileImage.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(uploadProfileImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to upload profile image';
      });
  },
});

export const { clearProfileError } = profileSlice.actions;
export default profileSlice.reducer;
