import { createSlice } from '@reduxjs/toolkit';
import type { HikeState } from './hike';
import { createHike } from './hike.thunk';

const initialState: HikeState = {
  hikeData: null,
  loading: false,
  error: '',
};

const hikeSlice = createSlice({
  name: 'hike',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createHike.pending, state => {
        state.loading = true;
      })
      .addCase(createHike.fulfilled, (state, action) => {
        state.loading = false;
        state.hikeData = action.payload;
      })
      .addCase(createHike.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default hikeSlice.reducer;
