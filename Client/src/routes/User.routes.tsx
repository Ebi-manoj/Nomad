import { Route } from 'react-router-dom';
import { Protected } from './Protected';
import { HomeLayout } from '@/layouts/HomeLayout';
import { Hike } from '@/pages/User/Hike';
import ProfilePage from '@/pages/User/Profile';

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
    <Route path="/profile" element={<ProfilePage />} />
  </Route>
);
