import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type SubscriptionDTO } from '@/types/subscription';
import type { SubscriptionState } from './subscription';
import { fetchSubscriptionDetails } from './subscription.thunk';

const initialState: SubscriptionState = {
  data: null,
  loading: false,
  error: '',
};

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    setCompleted(state, action: PayloadAction<SubscriptionDTO>) {
      if (state.data) {
        state.data.subscription = action.payload;
        state.data.tier = action.payload.tier;
        state.data.features = action.payload.features;
      }
    },
    clear(state) {
      state.data = null;
      state.error = '';
      state.loading = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSubscriptionDetails.pending, state => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchSubscriptionDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSubscriptionDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCompleted, clear } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
