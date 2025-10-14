import { Route } from 'react-router-dom';
import { Protected } from './Protected';
import { HomeLayout } from '@/layouts/HomeLayout';
import { Hike } from '@/pages/User/Hike';
import ProfilePage from '@/pages/User/Profile';
import { GoogleApiWrapper } from '@/components/GoogleApiWrapper';

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
        <GoogleApiWrapper>
          <Hike />
        </GoogleApiWrapper>
      }
    />
    <Route path="/profile" element={<ProfilePage />} />
  </Route>
);
