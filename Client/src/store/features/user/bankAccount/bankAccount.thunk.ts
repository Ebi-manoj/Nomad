import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchBankAccountsApi } from './bankAccount.api';
import { useHandleThunkError } from '@/hooks/useHandleThunkError';
import { ErrorMessage } from '@/utils/constants';
import type { BankAccountDTO } from './bankAccount';

export const fetchBankAccounts = createAsyncThunk<
  BankAccountDTO[],
  void
>('bankAccount/fetchBankAccounts', async (_: void, { rejectWithValue }) => {
  try {
    return await fetchBankAccountsApi();
  } catch (err: unknown) {
    return useHandleThunkError(
      err,
      rejectWithValue,
      ErrorMessage.SOMETHING_WENT_WRONG
    );
  }
});
