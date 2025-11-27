import { createSlice } from '@reduxjs/toolkit';
import type { WalletState } from './wallet';
import { fetchWalletDetails } from './wallet.thunk';

const initialState: WalletState = {
  loading: false,
  error: '',
  walletData: {
    balance: 0,
    currency: 'INR',
    transactions: [],
    totalCredits: 0,
    totalDebits: 0,
    pagination: {
      total: 0,
    },
  },
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchWalletDetails.pending, state => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchWalletDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.walletData = action.payload;
      })
      .addCase(fetchWalletDetails.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || 'Failed to load wallet data';
      });
  },
});

export default walletSlice.reducer;
