import { createAsyncThunk } from '@reduxjs/toolkit';
import { getHikersMatched } from '@/api/ride';
import type { GetHikersMatchedResponseDTO } from '@/types/matchedHiker';
import { useHandleThunkError } from '@/hooks/useHandleThunkError';
import { ErrorMessage } from '@/utils/constants';

export const fetchMatchedHikers = createAsyncThunk<
  GetHikersMatchedResponseDTO[],
  string
>('matchedHikers/fetch', async (rideId, { rejectWithValue }) => {
  try {
    return await getHikersMatched(rideId);
  } catch (error) {
    return useHandleThunkError(
      error,
      rejectWithValue,
      ErrorMessage.SOMETHING_WENT_WRONG
    );
  }
});
