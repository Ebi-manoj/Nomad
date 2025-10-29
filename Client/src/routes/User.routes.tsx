import { Route } from 'react-router-dom';
import { Protected } from './Protected';
import { HomeLayout } from '@/layouts/HomeLayout';
import { Hike } from '@/pages/User/Hike';
import ProfilePage from '@/pages/User/Profile';
import { RideMatching } from '@/pages/User/MatchRideToHike/RideMatching';
import { Ride } from '@/pages/User/Ride';
import { RideStarted } from '@/pages/User/RideStarted';

export const UserRoutes = (
  <Route
    path="/"
    element={
      <Protected allowedRole="user">
        <HomeLayout />
      </Protected>
    }
  >
    <Route path="hike" element={<Hike />} />
    <Route path="hike/match" element={<RideMatching />} />
    <Route path="/profile" element={<ProfilePage />} />
    <Route path="/ride" element={<Ride />} />
    <Route path="/ride/started" element={<RideStarted />} />
  </Route>
);
