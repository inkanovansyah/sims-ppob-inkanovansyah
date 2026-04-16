import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import profileReducer from './slices/profileSlice';
import balanceReducer from './slices/balanceSlice';
import serviceReducer from './slices/serviceSlice';
import bannerReducer from './slices/bannerSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    balance: balanceReducer,
    services: serviceReducer,
    banners: bannerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
