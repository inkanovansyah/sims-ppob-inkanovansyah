import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '../../types/auth';

// State awal untuk autentikasi, mengambil token dari localStorage jika ada
const initialState: AuthState = {
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action untuk mengatur status loading saat proses auth berlangsung
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    // Action saat login berhasil: simpan token ke state dan localStorage
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      localStorage.setItem('token', action.payload);
    },
    // Action saat login gagal
    loginFailed: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Action untuk logout: hapus token dari state dan localStorage
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      localStorage.removeItem('token');
    },
    // Action untuk membersihkan pesan error
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setLoading, loginSuccess, loginFailed, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
