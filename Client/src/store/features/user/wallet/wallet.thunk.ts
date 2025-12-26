import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWalletDetailsApi, withdrawApi } from './wallet.api';
import { useHandleThunkError } from '@/hooks/useHandleThunkError';
import { ErrorMessage } from '@/utils/constants';
import type { WalletDetailsDTO } from './wallet';

export const fetchWalletDetails = createAsyncThunk<
  WalletDetailsDTO,
  number | undefined
>('wallet/fetchWalletDetails', async (page = 1, { rejectWithValue }) => {
  try {
    return await fetchWalletDetailsApi(page);
  } catch (err: unknown) {
    return useHandleThunkError(
      err,
      rejectWithValue,
      ErrorMessage.SOMETHING_WENT_WRONG
    );
  }
});

export const withdrawWallet = createAsyncThunk<
  { success: boolean },
  void
>('wallet/withdraw', async (_: void, { rejectWithValue }) => {
  try {
    return await withdrawApi();
  } catch (err: unknown) {
    return useHandleThunkError(
      err,
      rejectWithValue,
      ErrorMessage.SOMETHING_WENT_WRONG
    );
  }
});
