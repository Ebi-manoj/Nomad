import { createAsyncThunk } from '@reduxjs/toolkit';
import type { CreateHikeDTO } from './hike';
import { createHikeApi } from './hike.api';
import { useHandleThunkError } from '@/hooks/useHandleThunkError';
import { ErrorMessage } from '@/utils/constants';

export const createHike = createAsyncThunk(
  'hike/createHike',
  async (data: CreateHikeDTO, { rejectWithValue }) => {
    try {
      return await createHikeApi(data);
    } catch (err: unknown) {
      useHandleThunkError(
        err,
        rejectWithValue,
        ErrorMessage.SOMETHING_WENT_WRONG
      );
    }
  }
);
