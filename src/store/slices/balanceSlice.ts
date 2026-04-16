import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BalanceState } from '../../types/balance';
import { getBalance } from '../../services/balanceService';

const initialState: BalanceState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchBalance = createAsyncThunk('balance/fetch', async () => {
  const response = await getBalance();
  return response.data;
});

const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch balance';
      });
  },
});

export default balanceSlice.reducer;
