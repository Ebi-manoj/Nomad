import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import usersReducer from './features/admin/users/usersSlice';
import docsReducer from './features/user/documents/docSlice';
import adminDocsReducer from './features/admin/documents/adminDocs.slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    documents: docsReducer,
    adminDocs: adminDocsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
