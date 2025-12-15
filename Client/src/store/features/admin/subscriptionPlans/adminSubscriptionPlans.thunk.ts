import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAdminSubscriptionPlansApi } from '@/api/adminSubscriptionPlan';
import { useHandleThunkError } from '@/hooks/useHandleThunkError';
import { ErrorMessage } from '@/utils/constants';
import type { AdminSubscriptionPlanDTO } from '@/types/adminSubscription';

export const fetchAdminSubscriptionPlans = createAsyncThunk<
  AdminSubscriptionPlanDTO[],
  void
>('adminSubscriptionPlans/fetchAll', async (_: void, { rejectWithValue }) => {
  try {
    const res = await getAdminSubscriptionPlansApi();
    return res;
  } catch (error) {
    return useHandleThunkError(
      error,
      rejectWithValue,
      ErrorMessage.SOMETHING_WENT_WRONG
    );
  }
});
