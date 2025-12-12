import { createAsyncThunk } from '@reduxjs/toolkit';
import type { SosContactDTO } from '@/types/sos';
import { fetchSosContactsApi, addSosContactApi } from './sos.api';
import { useHandleThunkError } from '@/hooks/useHandleThunkError';
import { ErrorMessage } from '@/utils/constants';

export const fetchSosContacts = createAsyncThunk<SosContactDTO[], void>(
  'sos/fetchSosContacts',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchSosContactsApi();
    } catch (err: unknown) {
      return useHandleThunkError(
        err,
        rejectWithValue,
        ErrorMessage.SOMETHING_WENT_WRONG
      );
    }
  }
);

export const addSosContact = createAsyncThunk<
  SosContactDTO[],
  Omit<SosContactDTO, 'id'>
>('sos/addSosContact', async (contact, { rejectWithValue }) => {
  try {
    return await addSosContactApi(contact);
  } catch (err: unknown) {
    return useHandleThunkError(
      err,
      rejectWithValue,
      ErrorMessage.SOMETHING_WENT_WRONG
    );
  }
});
