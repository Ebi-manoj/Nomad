import { createAsyncThunk } from '@reduxjs/toolkit';
import type { fetchAllDocsQuery, verifyDocReqDTO } from './adminDoc';
import { fetchAllDocsApi, verifyDocumentApi } from './adminDoc.api';
import { handleThunkError } from '@/utils/HandleThunkError';
import { ErrorMessage } from '@/utils/constants';

export const fetchAllDocs = createAsyncThunk(
  'adminDocs/fetchall',
  async (query: fetchAllDocsQuery, { rejectWithValue }) => {
    try {
      return await fetchAllDocsApi(query);
    } catch (error) {
      handleThunkError(
        error,
        rejectWithValue,
        ErrorMessage.SOMETHING_WENT_WRONG
      );
    }
  }
);

export const verifyDocument = createAsyncThunk(
  'adminDocs/verify',
  async (data: verifyDocReqDTO, { rejectWithValue }) => {
    try {
      return await verifyDocumentApi(data);
    } catch (error) {
      handleThunkError(
        error,
        rejectWithValue,
        ErrorMessage.SOMETHING_WENT_WRONG
      );
    }
  }
);
