import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { HikeResponseDTO, HikeState } from './hike';
import { createHike } from './hike.thunk';

const initialState: HikeState = {
  hikeData: null,
  loading: false,
  error: '',
};

const hikeSlice = createSlice({
  name: 'hike',
  initialState,
  reducers: {
    setActiveHike(state, action: PayloadAction<HikeResponseDTO | null>) {
      state.hikeData = action.payload;
    },
  },
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

export const { setActiveHike } = hikeSlice.actions;
export default hikeSlice.reducer;
