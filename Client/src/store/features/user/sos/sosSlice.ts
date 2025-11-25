import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { SosContactDTO } from '@/types/sos';
import type { SosState } from './sos';
import { fetchSosContacts, addSosContact } from './sos.thunk';

const initialState: SosState = {
  contacts: [],
  loading: false,
  error: '',
};

const sosSlice = createSlice({
  name: 'sos',
  initialState,
  reducers: {
    setContacts(state, action: PayloadAction<SosContactDTO[]>) {
      state.contacts = action.payload;
    },
    clearSosState(state) {
      state.contacts = [];
      state.loading = false;
      state.error = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSosContacts.pending, state => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchSosContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
      })
      .addCase(fetchSosContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Failed to load SOS contacts';
      })
      .addCase(addSosContact.pending, state => {
        state.loading = true;
        state.error = '';
      })
      .addCase(addSosContact.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
      })
      .addCase(addSosContact.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Failed to save SOS contact';
      });
  },
});

export const { setContacts, clearSosState } = sosSlice.actions;
export default sosSlice.reducer;
