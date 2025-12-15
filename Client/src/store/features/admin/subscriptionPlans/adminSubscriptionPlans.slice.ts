import { createSlice } from '@reduxjs/toolkit';
import type { AdminSubscriptionPlansState } from './adminSubscriptionPlans.d';
import { fetchAdminSubscriptionPlans } from './adminSubscriptionPlans.thunk';

const initialState: AdminSubscriptionPlansState = {
  plans: [],
  loading: false,
  error: '',
};

const adminSubscriptionPlansSlice = createSlice({
  name: 'adminSubscriptionPlans',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAdminSubscriptionPlans.pending, state => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchAdminSubscriptionPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.plans = action.payload;
      })
      .addCase(fetchAdminSubscriptionPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? 'Failed to fetch plans';
      });
  },
});

export default adminSubscriptionPlansSlice.reducer;
