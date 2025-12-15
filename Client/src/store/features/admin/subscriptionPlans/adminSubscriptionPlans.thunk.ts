import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createSubscriptionPlanApi,
  getAdminSubscriptionPlansApi,
} from '@/api/adminSubscriptionPlan';
import { useHandleThunkError } from '@/hooks/useHandleThunkError';
import { ErrorMessage } from '@/utils/constants';
import type {
  AdminSubscriptionPlanDTO,
  CreateSubscriptionPlanDTO,
} from '@/types/adminSubscription';

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

export const createSubscriptionPlan = createAsyncThunk<
  AdminSubscriptionPlanDTO,
  CreateSubscriptionPlanDTO
>('adminSubscriptionPlas/create', async (data, { rejectWithValue }) => {
  try {
    return await createSubscriptionPlanApi(data);
  } catch (error) {
    return useHandleThunkError(
      error,
      rejectWithValue,
      ErrorMessage.SOMETHING_WENT_WRONG
    );
  }
});
