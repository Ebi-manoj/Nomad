import { createAsyncThunk } from '@reduxjs/toolkit';
import { completeTaskApi, getTasks } from '@/api/ride';
import type { Task } from '@/types/task';
import { useHandleThunkError } from '@/hooks/useHandleThunkError';
import { ErrorMessage } from '@/utils/constants';
import type { CompleteTaskReqDTO, CompleteTaskResponseDTO } from './riderTasks';

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

export const completeTask = createAsyncThunk<
  CompleteTaskResponseDTO,
  CompleteTaskReqDTO
>('riderTask/complete', async (data, { rejectWithValue }) => {
  try {
    return await completeTaskApi(data);
  } catch (error) {
    return useHandleThunkError(
      error,
      rejectWithValue,
      ErrorMessage.SOMETHING_WENT_WRONG
    );
  }
});
