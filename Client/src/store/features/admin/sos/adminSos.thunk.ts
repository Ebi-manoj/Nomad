import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AdminSosLog, FetchAdminSosQuery } from './adminSos.d';
import { fetchAdminSosApi, resolveSosApi } from './adminSos.api';
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

export const resolveSosLog = createAsyncThunk<AdminSosLog, string>(
  'admin/resolveSos',
  async (id, { rejectWithValue }) => {
    try {
      return await resolveSosApi(id);
    } catch (error) {
      return useHandleThunkError(
        error,
        rejectWithValue,
        ErrorMessage.SOMETHING_WENT_WRONG
      );
    }
  }
);
