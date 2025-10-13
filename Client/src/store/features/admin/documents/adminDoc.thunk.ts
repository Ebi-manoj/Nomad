import { createAsyncThunk } from '@reduxjs/toolkit';
import type { fetchAllDocsQuery } from './adminDoc';
import { fetchAllDocsApi } from './adminDoc.api';
import { useHandleThunkError } from '@/hooks/useHandleThunkError';
import { ErrorMessage } from '@/utils/constants';

export const fetchAllDocs = createAsyncThunk(
  'adminDocs/fetchall',
  async (query: fetchAllDocsQuery, { rejectWithValue }) => {
    try {
      return await fetchAllDocsApi(query);
    } catch (error) {
      useHandleThunkError(
        error,
        rejectWithValue,
        ErrorMessage.SOMETHING_WENT_WRONG
      );
    }
  }
);
