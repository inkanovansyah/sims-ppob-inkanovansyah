import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getHistory } from '../../services/transactionService';
import { HistoryRecord } from '../../types/transaction';

interface TransactionState {
  records: HistoryRecord[];
  offset: number;
  limit: number;
  loading: boolean;
  error: string | null;
  hasMore: boolean;
}

const initialState: TransactionState = {
  records: [],
  offset: 0,
  limit: 5,
  loading: false,
  error: null,
  hasMore: true,
};

// Thunk Asinkron untuk mengambil riwayat transaksi dari API
export const fetchHistory = createAsyncThunk(
  'transaction/fetchHistory',
  async ({ offset, limit }: { offset: number; limit: number }) => {
    const response = await getHistory(offset, limit);
    return response.data;
  }
);

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    // Mereset data riwayat (digunakan saat masuk halaman pertama kali)
    resetHistory: (state) => {
      state.records = [];
      state.offset = 0;
      state.hasMore = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        const newRecords = action.payload.records;

        // PENTING: Filter record duplikat berdasarkan invoice_number untuk mencegah data ganda di UI (bug fix)
        const existingInvoiceNumbers = new Set(state.records.map(r => r.invoice_number));
        const uniqueNewRecords = newRecords.filter(r => !existingInvoiceNumbers.has(r.invoice_number));

        // Gabungkan data unik baru ke daftar yang sudah ada
        state.records = [...state.records, ...uniqueNewRecords];
        // Tambah offset untuk pengambilan data berikutnya (n + limit)
        state.offset += state.limit;

        state.loading = false;

        // Jika data yang dikembalikan kurang dari limit, berarti sudah mencapai akhir data
        if (newRecords.length < state.limit) {
          state.hasMore = false;
        }
      })
      .addCase(fetchHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch transaction history';
      });
  },
});

export const { resetHistory } = transactionSlice.actions;
export default transactionSlice.reducer;
