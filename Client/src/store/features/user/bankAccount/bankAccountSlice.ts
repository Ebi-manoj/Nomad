import { createSlice } from '@reduxjs/toolkit';
import type { BankAccountState } from './bankAccount';
import { fetchBankAccounts } from './bankAccount.thunk';

const initialState: BankAccountState = {
  loading: false,
  error: '',
  accounts: [],
};

const bankAccountSlice = createSlice({
  name: 'bankAccount',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchBankAccounts.pending, state => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchBankAccounts.fulfilled, (state, action) => {
        state.loading = false;
        state.accounts = action.payload;
      })
      .addCase(fetchBankAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Failed to load accounts';
      });
  },
});

export default bankAccountSlice.reducer;
