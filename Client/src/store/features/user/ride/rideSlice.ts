import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RideData, RideState } from './ride';
import { createRide } from './ride.thunk';
import { completeTask } from '../riderTasks/riderTasks.thunk';
import { fetchMatchedHikers } from '../matchedHikers/matchedHikers.thunk';

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
    clearRideData(state) {
      state.rideData = null;
      state.error = '';
      state.loading = false;
    },
    releaseSeats(state, action) {
      if (state.rideData) {
        console.log(action.payload);
        state.rideData.seatsAvailable -= action.payload;
      }
    },
    updateSeats(state, action) {
      if (state.rideData) {
        state.rideData.seatsAvailable = action.payload;
      }
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
      })
      .addCase(completeTask.fulfilled, (state, action) => {
        if (state.rideData) {
          state.rideData.seatsAvailable = action.payload.seatsAvailable;
        }
      });
  },
});

export const { setActiveRide, clearRideData, releaseSeats, updateSeats } =
  rideSlice.actions;
export default rideSlice.reducer;
