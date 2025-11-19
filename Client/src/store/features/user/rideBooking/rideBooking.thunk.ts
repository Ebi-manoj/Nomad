import { createAsyncThunk } from '@reduxjs/toolkit';
import type { BookingLiveResDTO, RideBookingResponseDTO } from './rideBooking';
import { getRideBookingDetails, getRideBookingLive } from '@/api/rideBooking';
import { useHandleThunkError } from '@/hooks/useHandleThunkError';
import { ErrorMessage } from '@/utils/constants';

export const getRideBookingThunk = createAsyncThunk<
  RideBookingResponseDTO,
  string
>('ride/booking', async (id, { rejectWithValue }) => {
  try {
    return await getRideBookingDetails(id);
  } catch (error) {
    useHandleThunkError(
      error,
      rejectWithValue,
      ErrorMessage.SOMETHING_WENT_WRONG
    );
  }
});

export const getBookingLiveThunk = createAsyncThunk<BookingLiveResDTO, string>(
  'booking/live',
  async (id, { rejectWithValue }) => {
    try {
      return await getRideBookingLive(id);
    } catch (error) {
      useHandleThunkError(
        error,
        rejectWithValue,
        ErrorMessage.SOMETHING_WENT_WRONG
      );
    }
  }
);
