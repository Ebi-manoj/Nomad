import { createAsyncThunk } from '@reduxjs/toolkit';
import type { DeleteSosContactResDTO, SosContactDTO } from '@/types/sos';
import {
  fetchSosContactsApi,
  addSosContactApi,
  editSosContactApi,
  deleteSosContactApi,
} from './sos.api';
import { handleThunkError } from '@/utils/HandleThunkError';
import { ErrorMessage } from '@/utils/constants';
import type { EditContactPayload } from './sos';

export const fetchSosContacts = createAsyncThunk<SosContactDTO[], void>(
  'sos/fetchSosContacts',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchSosContactsApi();
    } catch (err: unknown) {
      return handleThunkError(
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
    return handleThunkError(
      err,
      rejectWithValue,
      ErrorMessage.SOMETHING_WENT_WRONG
    );
  }
});

export const editSosContact = createAsyncThunk<
  SosContactDTO,
  EditContactPayload
>('sos/editSosContact', async ({ id, contact }, { rejectWithValue }) => {
  try {
    return await editSosContactApi(id, contact);
  } catch (err: unknown) {
    return handleThunkError(
      err,
      rejectWithValue,
      ErrorMessage.SOMETHING_WENT_WRONG
    );
  }
});

export const deleteSosContact = createAsyncThunk<
  DeleteSosContactResDTO,
  string
>('sos/deleteSosContact', async (id, { rejectWithValue }) => {
  try {
    return await deleteSosContactApi(id);
  } catch (err: unknown) {
    return handleThunkError(
      err,
      rejectWithValue,
      ErrorMessage.SOMETHING_WENT_WRONG
    );
  }
});
