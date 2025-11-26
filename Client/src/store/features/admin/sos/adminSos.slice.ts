import { createSlice } from '@reduxjs/toolkit';
import type { AdminSosState } from './adminSos.d';
import { fetchAdminSosLogs, resolveSosLog } from './adminSos.thunk';

const initialState: AdminSosState = {
  loading: false,
  logs: [],
  totalCount: 0,
};

const adminSosSlice = createSlice({
  name: 'adminSos',
  initialState,
  reducers: {},
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
    builder.addCase(resolveSosLog.fulfilled, (state, action) => {
      state.loading = false;
      const log = state.logs.find(l => l.id === action.payload.id);
      if (log) {
        log.status = action.payload.status;
      }
    });
  },
});

export default adminSosSlice.reducer;
