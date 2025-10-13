import { createSlice } from '@reduxjs/toolkit';
import type { AdminDocState } from './adminDoc';
import { fetchAllDocs } from './adminDoc.thunk';

const initialState: AdminDocState = {
  loading: false,
  documents: [],
};

const adminDocsSlice = createSlice({
  name: 'adminDocs',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder.addCase(fetchAllDocs.pending, state => {
      state.loading = true;
      state.documents = [];
    });
    builder.addCase(fetchAllDocs.fulfilled, (state, action) => {
      state.loading = false;
      state.documents = action.payload;
    });
  },
});

export default adminDocsSlice.reducer;
