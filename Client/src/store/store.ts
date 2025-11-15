import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import usersReducer from './features/admin/users/usersSlice';
import docsReducer from './features/user/documents/docSlice';
import adminDocsReducer from './features/admin/documents/adminDocs.slice';
import hikeReducer from './features/user/hike/hikeSlice';
import rideReducer from './features/user/ride/rideSlice';
import rideBookingReducer from './features/user/rideBooking/rideBookingSlice';
import riderTasksReducer from './features/user/riderTasks/riderTasksSlice';
import matchedHikersReducer from './features/user/matchedHikers/matchedHikersSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    documents: docsReducer,
    adminDocs: adminDocsReducer,
    hike: hikeReducer,
    ride: rideReducer,
    rideBooking: rideBookingReducer,
    riderTasks: riderTasksReducer,
    matchedHikers: matchedHikersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
