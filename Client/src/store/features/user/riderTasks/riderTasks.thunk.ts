import { createAsyncThunk } from '@reduxjs/toolkit';
import { getTasks } from '@/api/ride';
import type { Task } from '@/types/task';
import { useHandleThunkError } from '@/hooks/useHandleThunkError';
import { ErrorMessage } from '@/utils/constants';

export const fetchRiderTasks = createAsyncThunk<Task[], string>(
  'riderTasks/fetch',
  async (rideId, { rejectWithValue }) => {
    try {
      return await getTasks(rideId);
    } catch (error) {
      return useHandleThunkError(
        error,
        rejectWithValue,
        ErrorMessage.SOMETHING_WENT_WRONG
      );
    }
  }
);
