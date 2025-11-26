import { createAsyncThunk } from '@reduxjs/toolkit';
import type { FetchAdminSosQuery } from './adminSos.d';
import { fetchAdminSosApi } from './adminSos.api';
import { useHandleThunkError } from '@/hooks/useHandleThunkError';
import { ErrorMessage } from '@/utils/constants';

export const fetchAdminSosLogs = createAsyncThunk(
  'adminSos/fetchAll',
  async (query: FetchAdminSosQuery, { rejectWithValue }) => {
    try {
      return await fetchAdminSosApi(query);
    } catch (error) {
      return useHandleThunkError(
        error,
        rejectWithValue,
        ErrorMessage.SOMETHING_WENT_WRONG
      );
    }
  }
);
