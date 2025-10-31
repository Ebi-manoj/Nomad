import { Route } from 'react-router-dom';
import { Protected } from './Protected';
import { HomeLayout } from '@/layouts/HomeLayout';
import { Hike } from '@/pages/User/Hike';
import ProfilePage from '@/pages/User/Profile';
import { RideMatching } from '@/pages/User/MatchRideToHike';
import { Ride } from '@/pages/User/Ride';
import { RideStarted } from '@/pages/User/RideStarted';
import { ProtectedSession } from './ProtectedSessions';

export const UserRoutes = (
  <Route
    path="/"
    element={
      <Protected allowedRole="user">
        <HomeLayout />
      </Protected>
    }
  >
    <Route
      path="hike"
      element={
        <ProtectedSession>
          <Hike />
        </ProtectedSession>
      }
    />
    <Route
      path="hike/match"
      element={
        <ProtectedSession requireActiveHike>
          <RideMatching />
        </ProtectedSession>
      }
    />
    <Route path="/profile" element={<ProfilePage />} />
    <Route
      path="/ride"
      element={
        <ProtectedSession>
          <Ride />
        </ProtectedSession>
      }
    />
    <Route
      path="/ride/started"
      element={
        <ProtectedSession requireActiveRide>
          <RideStarted />
        </ProtectedSession>
      }
    />
  </Route>
);
