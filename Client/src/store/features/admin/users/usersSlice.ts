import { createSlice } from '@reduxjs/toolkit';
import type { userState } from './userSlice';
import { fetchUsers } from './usersSlice.thunk';

const initialState: userState = {
  loading: false,
  users: [],
  totalPages: 0,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUsers.pending, state => {
      state.loading = true;
      state.users = [];
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload.users;
      state.totalPages = action.payload.totalPages;
    });
  },
});

export default usersSlice.reducer;
