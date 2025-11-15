import { createSlice } from '@reduxjs/toolkit';
import type { MatchedHikersState } from './matchedHikers';
import { fetchMatchedHikers } from './matchedHikers.thunk';

const initialState: MatchedHikersState = {
  hikers: [],
  loading: false,
  error: '',
};

const matchedHikersSlice = createSlice({
  name: 'matchedHikers',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchMatchedHikers.pending, state => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchMatchedHikers.fulfilled, (state, action) => {
        state.loading = false;
        state.hikers = action.payload;
      })
      .addCase(fetchMatchedHikers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default matchedHikersSlice.reducer;
