import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchDocsApi, uploadDocsApi } from './docs.api';
import { useHandleThunkError } from '@/hooks/useHandleThunkError';
import { ErrorMessage } from '@/utils/constants';
import type { document, uploadDocsRequest } from './doc';

export const uploadDocs = createAsyncThunk<document, uploadDocsRequest>(
  'docs/upload',
  async (data, { rejectWithValue }) => {
    try {
      return await uploadDocsApi(data);
    } catch (error) {
      return useHandleThunkError(
        error,
        rejectWithValue,
        ErrorMessage.SOMETHING_WENT_WRONG
      );
    }
  }
);

export const fetchDocs = createAsyncThunk(
  'docs/fetch',
  async (_: void, { rejectWithValue }) => {
    try {
      return await fetchDocsApi();
    } catch (error) {
      return useHandleThunkError(
        error,
        rejectWithValue,
        ErrorMessage.SOMETHING_WENT_WRONG
      );
    }
  }
);
