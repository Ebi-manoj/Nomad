import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUsersAPI } from './userSlice.api';
import { useHandleThunkError } from '@/hooks/useHandleThunkError';
import { ErrorMessage } from '@/utils/constants';
import type { PaginationDTO } from '@/types/pagination';

export const fetchUsers = createAsyncThunk(
  'users/fetch',
  async (data: PaginationDTO, { rejectWithValue }) => {
    try {
      return await fetchUsersAPI(data);
    } catch (error) {
      useHandleThunkError(
        error,
        rejectWithValue,
        ErrorMessage.FETCH_USERS_FAILED
      );
    }
  }
);
