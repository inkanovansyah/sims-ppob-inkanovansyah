import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BalanceState } from '../../types/balance';
import { getBalance, topUp } from '../../services/balanceService';

// State awal untuk saldo user
const initialState: BalanceState = {
  data: null,
  loading: false,
  error: null,
};

// Async Thunk untuk mengambil informasi saldo terbaru dari API
export const fetchBalance = createAsyncThunk('balance/fetch', async () => {
  const response = await getBalance();
  return response.data;
});

// Async Thunk untuk melakukan penambahan saldo (Top Up)
export const topUpBalance = createAsyncThunk('balance/topUp', async (amount: number) => {
  const response = await topUp(amount);
  return response.data;
});

const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    // Action untuk membersihkan status error pada state saldo
    clearBalanceError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Case untuk pengambilan saldo
      .addCase(fetchBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.data = action.payload; // Update data saldo dengan respon terbaru
        state.loading = false;
      })
      .addCase(fetchBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Gagal mengambil saldo';
      })
      // Case untuk pengisian saldo (Top Up)
      .addCase(topUpBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(topUpBalance.fulfilled, (state, action) => {
        state.data = action.payload; // Update saldo setelah top up berhasil
        state.loading = false;
      })
      .addCase(topUpBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Top Up gagal';
      });
  },
});

export const { clearBalanceError } = balanceSlice.actions;
export default balanceSlice.reducer;
