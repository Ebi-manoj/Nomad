import { createSlice } from '@reduxjs/toolkit';
import type { userState } from './userSlice';
import { fetchUsers, toggleBlock } from './usersSlice.thunk';
import type { User } from '@/types/auth';

const initialState: userState = {
  loading: true,
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
    builder.addCase(toggleBlock.fulfilled, (state, action) => {
      const updatedUser: User = action.payload;
      const index = state.users.findIndex(u => u.id == updatedUser.id);
      if (index != -1) state.users[index] = updatedUser;
    });
  },
});

export default usersSlice.reducer;
