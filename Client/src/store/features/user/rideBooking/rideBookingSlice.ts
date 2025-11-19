import { createSlice } from '@reduxjs/toolkit';
import type { RideBookingState } from './rideBooking';
import { getBookingLiveThunk, getRideBookingThunk } from './rideBooking.thunk';

const initialState: RideBookingState = {
  loading: false,
  booking: null,
  error: '',
};

const rideBookingSlice = createSlice({
  name: 'rideBooking',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getRideBookingThunk.pending, state => {
      state.loading = true;
      state.booking = null;
      state.error = '';
    });
    builder.addCase(getRideBookingThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.booking = action.payload;
      state.error = '';
    });
    builder.addCase(getRideBookingThunk.rejected, (state, action) => {
      console.log('redux rejected booking');
      state.loading = false;
      state.error = action.payload as string;
      state.booking = null;
    });
    builder.addCase(getBookingLiveThunk.fulfilled, (state, action) => {
      if (state.booking) {
        state.booking.rider.currentLocation = action.payload.currentLocation;
        state.booking.rideDetails.departure = action.payload.departure;
      }
    });
  },
});

export default rideBookingSlice.reducer;
