import { createAsyncThunk } from '@reduxjs/toolkit';
import { uploadDocsApi } from './docs.api';
import { useHandleThunkError } from '@/hooks/useHandleThunkError';
import { ErrorMessage } from '@/utils/constants';
import type { document, uploadDocsRequest } from './doc';

export const uploadDocs = createAsyncThunk<document, uploadDocsRequest>(
  'docs/upload',
  async (data, { rejectWithValue }) => {
    try {
      return await uploadDocsApi(data);
    } catch (error) {
      useHandleThunkError(
        error,
        rejectWithValue,
        ErrorMessage.SOMETHING_WENT_WRONG
      );
    }
  }
);
