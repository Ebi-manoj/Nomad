import { createSlice } from '@reduxjs/toolkit';
import type { BankAccountState } from './bankAccount';
import {
  addBankAccounts,
  deleteBankAccount,
  fetchBankAccounts,
  setPrimaryBankAccount,
} from './bankAccount.thunk';

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

    builder
      .addCase(addBankAccounts.pending, state => {
        state.loading = true;
        state.error = '';
      })
      .addCase(addBankAccounts.fulfilled, (state, action) => {
        state.loading = false;
        state.accounts.push(action.payload);
      })
      .addCase(addBankAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Failed to add Account';
      });

    builder
      .addCase(setPrimaryBankAccount.pending, state => {
        state.loading = true;
        state.error = '';
      })
      .addCase(setPrimaryBankAccount.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload;
        state.accounts = state.accounts.map(acc => ({
          ...acc,
          isPrimary: acc.id === id,
        }));
      })
      .addCase(setPrimaryBankAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Failed to set primary';
      });

    builder
      .addCase(deleteBankAccount.pending, state => {
        state.loading = true;
        state.error = '';
      })
      .addCase(deleteBankAccount.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload;
        state.accounts = state.accounts.filter(acc => acc.id !== id);
      })
      .addCase(deleteBankAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Failed to delete account';
      });
  },
});

export default bankAccountSlice.reducer;
