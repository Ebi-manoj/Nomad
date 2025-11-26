import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AdminSosLog, AdminSosState } from './adminSos.d';
import { fetchAdminSosLogs } from './adminSos.thunk';

const initialState: AdminSosState = {
  loading: false,
  logs: [],
  totalCount: 0,
};

const adminSosSlice = createSlice({
  name: 'adminSos',
  initialState,
  reducers: {
    markResolved(state, action: PayloadAction<string>) {
      const log = state.logs.find(l => l.id === action.payload);
      if (log) {
        log.status = 'RESOLVED';
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchAdminSosLogs.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchAdminSosLogs.fulfilled, (state, action) => {
      state.loading = false;
      state.logs = action.payload.logs;
      state.totalCount = action.payload.totalCount;
    });
    builder.addCase(fetchAdminSosLogs.rejected, state => {
      state.loading = false;
      state.logs = [];
    });
  },
});

export const { markResolved } = adminSosSlice.actions;
export default adminSosSlice.reducer;
