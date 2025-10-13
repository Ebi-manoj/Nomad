import { createSlice } from '@reduxjs/toolkit';
import { fetchDocs, uploadDocs } from './docs.thunk';
import type { DocState } from './doc';

const initialState: DocState = {
  loading: false,
  documents: [],
};

const docSlice = createSlice({
  name: 'docs',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchDocs.pending, state => {
      state.loading = true;
      state.documents = [];
    });
    builder.addCase(fetchDocs.fulfilled, (state, action) => {
      state.loading = false;
      state.documents = action.payload;
    });
    builder.addCase(uploadDocs.fulfilled, (state, action) => {
      state.loading = false;
      const newDoc = action.payload;
      state.documents = state.documents.map(doc =>
        doc.id != newDoc.id ? { ...doc } : newDoc
      );
    });
  },
});

export default docSlice.reducer;
