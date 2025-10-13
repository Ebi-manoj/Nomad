import { createSlice } from '@reduxjs/toolkit';
import type { AdminDocState } from './adminDoc';
import { fetchAllDocs, verifyDocument } from './adminDoc.thunk';

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
    builder.addCase(verifyDocument.pending, state => {
      state.loading = true;
    });
    builder.addCase(verifyDocument.fulfilled, (state, action) => {
      const updatedDoc = action.payload;
      const findDoc = state.documents.find(doc => doc.id == updatedDoc.id);
      if (findDoc) {
        findDoc.status = updatedDoc.status;
        findDoc.verified = updatedDoc.verified;
      }
      state.loading = false;
    });
  },
});

export default adminDocsSlice.reducer;
