import { Route } from 'react-router-dom';
import { Protected } from './Protected';
import { AdminLayout } from '@/layouts/AdminLayout';
import { UserMangement } from '@/pages/Admin/UserManagement';
import DocumentVerification from '@/pages/Admin/DocumentVerification';
import { AdminDashboard } from '@/pages/Admin/Dashboard/AdminDashboard';
import { SOSManagement } from '@/pages/Admin/SosManagement/SosManagement';
import { AdminHikesPage } from '@/pages/Admin/Hikes/Hike';
import { AdminRideLogsPage } from '@/pages/Admin/Rides/RideLogs';
import AdminHikeDetailsPage from '@/pages/Admin/HikeDetail/HikeDetails';
import AdminRideDetailsPage from '@/pages/Admin/RideDetails/RideDetails';
import { AdminSubscriptionPage } from '@/pages/Admin/Subscriptions/Subscription';

export const AdminRoutes = (
  <Route
    path="/admin"
    element={
      <Protected allowedRole="admin">
        <AdminLayout />
      </Protected>
    }
  >
    <Route index element={<AdminDashboard />} />
    <Route path="users" element={<UserMangement />} />
    <Route path="documents" element={<DocumentVerification />} />
    <Route path="sos-logs" element={<SOSManagement />} />
    <Route path="hikes" element={<AdminHikesPage />} />
    <Route path="hikes/:id" element={<AdminHikeDetailsPage />} />
    <Route path="rides" element={<AdminRideLogsPage />} />
    <Route path="rides/:id" element={<AdminRideDetailsPage />} />
    <Route path="subscriptions" element={<AdminSubscriptionPage />} />
  </Route>
);
