import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWalletDetailsApi } from './wallet.api';
import { useHandleThunkError } from '@/hooks/useHandleThunkError';
import { ErrorMessage } from '@/utils/constants';
import type { WalletDetailsDTO } from './wallet.d';

export const fetchWalletDetails = createAsyncThunk<WalletDetailsDTO, void>(
  'wallet/fetchWalletDetails',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchWalletDetailsApi();
    } catch (err: unknown) {
      return useHandleThunkError(
        err,
        rejectWithValue,
        ErrorMessage.SOMETHING_WENT_WRONG
      );
    }
  }
);
