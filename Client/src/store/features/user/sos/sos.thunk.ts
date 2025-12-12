import { createAsyncThunk } from '@reduxjs/toolkit';
import type { DeleteSosContactResDTO, SosContactDTO } from '@/types/sos';
import {
  fetchSosContactsApi,
  addSosContactApi,
  editSosContactApi,
  deleteSosContactApi,
} from './sos.api';
import { useHandleThunkError } from '@/hooks/useHandleThunkError';
import { ErrorMessage } from '@/utils/constants';
import type { EditContactPayload } from './sos';

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

export const editSosContact = createAsyncThunk<
  SosContactDTO,
  EditContactPayload
>('sos/addSosContact', async ({ id, contact }, { rejectWithValue }) => {
  try {
    return await editSosContactApi(id, contact);
  } catch (err: unknown) {
    return useHandleThunkError(
      err,
      rejectWithValue,
      ErrorMessage.SOMETHING_WENT_WRONG
    );
  }
});

export const deleteSosContact = createAsyncThunk<
  DeleteSosContactResDTO,
  string
>('sos/addSosContact', async (id, { rejectWithValue }) => {
  try {
    return await deleteSosContactApi(id);
  } catch (err: unknown) {
    return useHandleThunkError(
      err,
      rejectWithValue,
      ErrorMessage.SOMETHING_WENT_WRONG
    );
  }
});
