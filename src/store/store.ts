import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import profileReducer from './slices/profileSlice';
import balanceReducer from './slices/balanceSlice';
import serviceReducer from './slices/serviceSlice';
import bannerReducer from './slices/bannerSlice';
import transactionReducer from './slices/transactionSlice';

// Konfigurasi Store Redux Toolkit secara terpusat
export const store = configureStore({
  reducer: {
    auth: authReducer,           // Mengelola token dan status login
    profile: profileReducer,     // Mengelola data profil user
    balance: balanceReducer,     // Mengelola saldo user
    services: serviceReducer,    // Mengelola daftar layanan PPOB
    banners: bannerReducer,      // Mengelola banner promo
    transaction: transactionReducer, // Mengelola riwayat transaksi
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
