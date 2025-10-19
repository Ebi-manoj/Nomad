import { useHandleThunkError } from '@/hooks/useHandleThunkError';
import { ErrorMessage } from '@/utils/constants';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { CreateRideDTO, RideData } from './ride';
import { createRideApi } from './ride.api';

export const createRide = createAsyncThunk<RideData, CreateRideDTO>(
  'ride/create',
  async (data, { rejectWithValue }) => {
    try {
      return await createRideApi(data);
    } catch (error: unknown) {
      return useHandleThunkError(
        error,
        rejectWithValue,
        ErrorMessage.SOMETHING_WENT_WRONG
      );
    }
  }
);
