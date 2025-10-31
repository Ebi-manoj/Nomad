import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RideData, RideState } from './ride';
import { createRide } from './ride.thunk';

const initialState: RideState = {
  rideData: null,
  loading: false,
  error: '',
};

const rideSlice = createSlice({
  name: 'ride',
  initialState,
  reducers: {
    setActiveRide(state, action: PayloadAction<RideData | null>) {
      state.rideData = action.payload;
    },
  },
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

export const { setActiveRide } = rideSlice.actions;
export default rideSlice.reducer;
