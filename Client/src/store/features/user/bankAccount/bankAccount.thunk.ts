import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addBankAccountApi,
  fetchBankAccountsApi,
  setPrimaryBankAccountApi,
  deleteBankAccountApi,
} from './bankAccount.api';
import { handleThunkError } from '@/utils/HandleThunkError';
import { ErrorMessage } from '@/utils/constants';
import type { BankAccountDTO, CreateBankAccountDTO } from './bankAccount';

export const fetchBankAccounts = createAsyncThunk<BankAccountDTO[], void>(
  'bankAccount/fetchBankAccounts',
  async (_: void, { rejectWithValue }) => {
    try {
      return await fetchBankAccountsApi();
    } catch (err: unknown) {
      return handleThunkError(
        err,
        rejectWithValue,
        ErrorMessage.SOMETHING_WENT_WRONG
      );
    }
  }
);
export const addBankAccounts = createAsyncThunk<
  BankAccountDTO,
  CreateBankAccountDTO
>('bankAccount/addBankAccounts', async (data, { rejectWithValue }) => {
  try {
    return await addBankAccountApi(data);
  } catch (err: unknown) {
    return handleThunkError(
      err,
      rejectWithValue,
      ErrorMessage.SOMETHING_WENT_WRONG
    );
  }
});

export const setPrimaryBankAccount = createAsyncThunk<string, string>(
  'bankAccount/setPrimary',
  async (accountId, { rejectWithValue }) => {
    try {
      await setPrimaryBankAccountApi(accountId);
      return accountId;
    } catch (err: unknown) {
      return handleThunkError(
        err,
        rejectWithValue,
        ErrorMessage.SOMETHING_WENT_WRONG
      );
    }
  }
);

export const deleteBankAccount = createAsyncThunk<string, string>(
  'bankAccount/delete',
  async (accountId, { rejectWithValue }) => {
    try {
      await deleteBankAccountApi(accountId);
      return accountId;
    } catch (err: unknown) {
      return handleThunkError(
        err,
        rejectWithValue,
        ErrorMessage.SOMETHING_WENT_WRONG
      );
    }
  }
);
