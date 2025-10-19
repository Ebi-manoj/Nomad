import { createSlice } from '@reduxjs/toolkit';
import type { RideState } from './ride';
import { createRide } from './ride.thunk';

const initialState: RideState = {
  rideData: null,
  loading: false,
  error: '',
};

const rideSlice = createSlice({
  name: 'ride',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createRide.pending, state => {
        state.loading = true;
      })
      .addCase(createRide.fulfilled, (state, action) => {
        state.loading = false;
        state.rideData = action.payload;
      })
      .addCase(createRide.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default rideSlice.reducer;
