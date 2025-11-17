import { createSlice } from '@reduxjs/toolkit';
import type { RiderTasksState } from './riderTasks';
import { completeTask, fetchRiderTasks } from './riderTasks.thunk';

const initialState: RiderTasksState = {
  tasks: [],
  loading: false,
  error: '',
};

const riderTasksSlice = createSlice({
  name: 'riderTasks',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchRiderTasks.pending, state => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchRiderTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchRiderTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(completeTask.fulfilled, (state, action) => {
        const task = state.tasks.find(t => t.id === action.payload.taskId);
        if (task) {
          task.status = action.payload.status;
        }
      })
      .addCase(completeTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default riderTasksSlice.reducer;
