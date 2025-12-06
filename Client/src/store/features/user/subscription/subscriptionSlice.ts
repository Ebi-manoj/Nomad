import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { SubscriptionDTO } from '@/types/subscription';
import type { SubscriptionState } from './subscription';

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
      state.data = action.payload;
    },
    clear(state) {
      state.data = null;
    },
  },
});

export const { setCompleted, clear } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
