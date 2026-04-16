import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';

// Hook kustom untuk Dispatch yang sudah ter-type sesuai dengan AppDispatch aplikasi
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Hook kustom untuk Selector yang sudah ter-type sesuai dengan RootState aplikasi
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
