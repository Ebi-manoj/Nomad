import { createAsyncThunk } from '@reduxjs/toolkit';
import { getSubscriptionDetailsApi } from '@/api/subscription';
import { handleThunkError } from '@/utils/HandleThunkError';
import { ErrorMessage } from '@/utils/constants';
import type { GetSubscriptionDetailsResDTO } from '@/types/subscription';

export const fetchSubscriptionDetails = createAsyncThunk<
  GetSubscriptionDetailsResDTO,
  void
>('subscription/fetchDetails', async (_: void, { rejectWithValue }) => {
  try {
    return await getSubscriptionDetailsApi();
  } catch (error) {
    return handleThunkError(
      error,
      rejectWithValue,
      ErrorMessage.SOMETHING_WENT_WRONG
    );
  }
});
