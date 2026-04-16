import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BalanceState } from '../../types/balance';
import { getBalance, topUp } from '../../services/balanceService';

const initialState: BalanceState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchBalance = createAsyncThunk('balance/fetch', async () => {
  const response = await getBalance();
  return response.data;
});

export const topUpBalance = createAsyncThunk('balance/topUp', async (amount: number) => {
  const response = await topUp(amount);
  return response.data;
});

const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    clearBalanceError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Balance
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
      })
      // Top Up Balance
      .addCase(topUpBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(topUpBalance.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(topUpBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Top Up failed';
      });
  },
});

export const { clearBalanceError } = balanceSlice.actions;
export default balanceSlice.reducer;
