import { createSlice } from '@reduxjs/toolkit';
import { uploadDocs } from './docs.thunk';
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
    builder.addCase(uploadDocs.fulfilled, (state, action) => {
      state.loading = false;
      state.documents.push(action.payload);
    });
  },
});

export default docSlice.reducer;
