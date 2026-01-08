import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createSubscriptionPlanApi,
  deleteSubscriptionPlanApi,
  editSubscriptionPlanApi,
  getAdminSubscriptionPlansApi,
  toggleSubscriptionPlanStatusApi,
} from '@/api/adminSubscriptionPlan';
import { handleThunkError } from '@/utils/HandleThunkError';
import { ErrorMessage } from '@/utils/constants';
import type {
  AdminSubscriptionPlanDTO,
  CreateSubscriptionPlanDTO,
  EditSubscriptionPlanDTO,
} from '@/types/adminSubscription';

export const fetchAdminSubscriptionPlans = createAsyncThunk<
  AdminSubscriptionPlanDTO[],
  void
>('adminSubscriptionPlans/fetchAll', async (_: void, { rejectWithValue }) => {
  try {
    const res = await getAdminSubscriptionPlansApi();
    return res;
  } catch (error) {
    return handleThunkError(
      error,
      rejectWithValue,
      ErrorMessage.SOMETHING_WENT_WRONG
    );
  }
});

export const createSubscriptionPlan = createAsyncThunk<
  AdminSubscriptionPlanDTO,
  CreateSubscriptionPlanDTO
>('adminSubscriptionPlans/create', async (data, { rejectWithValue }) => {
  try {
    return await createSubscriptionPlanApi(data);
  } catch (error) {
    return handleThunkError(
      error,
      rejectWithValue,
      ErrorMessage.SOMETHING_WENT_WRONG
    );
  }
});

export const editSubscriptionPlan = createAsyncThunk<
  AdminSubscriptionPlanDTO,
  EditSubscriptionPlanDTO
>('adminSubscriptionPlans/edit', async (data, { rejectWithValue }) => {
  try {
    return await editSubscriptionPlanApi(data);
  } catch (error) {
    return handleThunkError(
      error,
      rejectWithValue,
      ErrorMessage.SOMETHING_WENT_WRONG
    );
  }
});

export const toggleSubscriptionPlanStatus = createAsyncThunk<
  { planId: string; isActive: boolean },
  string
>('adminSubscriptionPlans/toggle', async (data, { rejectWithValue }) => {
  try {
    return await toggleSubscriptionPlanStatusApi(data);
  } catch (error) {
    return handleThunkError(
      error,
      rejectWithValue,
      ErrorMessage.SOMETHING_WENT_WRONG
    );
  }
});
export const deleteSubscriptionPlan = createAsyncThunk<
  { planId: string; success: boolean },
  string
>('adminSubscriptionPlans/delete', async (data, { rejectWithValue }) => {
  try {
    return await deleteSubscriptionPlanApi(data);
  } catch (error) {
    return handleThunkError(
      error,
      rejectWithValue,
      ErrorMessage.SOMETHING_WENT_WRONG
    );
  }
});
