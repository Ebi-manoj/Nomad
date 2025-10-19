import { createAsyncThunk } from '@reduxjs/toolkit';
import type { CreateHikeDTO, HikeResponseDTO } from './hike';
import { createHikeApi } from './hike.api';
import { useHandleThunkError } from '@/hooks/useHandleThunkError';
import { ErrorMessage } from '@/utils/constants';

export const createHike = createAsyncThunk<HikeResponseDTO, CreateHikeDTO>(
  'hike/createHike',
  async (data, { rejectWithValue }) => {
    try {
      return await createHikeApi(data);
    } catch (err: unknown) {
      return useHandleThunkError(
        err,
        rejectWithValue,
        ErrorMessage.SOMETHING_WENT_WRONG
      );
    }
  }
);
