import { Route } from 'react-router-dom';
import { Protected } from './Protected';
import { AdminLayout } from '@/layouts/AdminLayout';
import { UserMangement } from '@/pages/Admin/UserManagement';
import DocumentVerification from '@/pages/Admin/DocumentVerification';
import { AdminDashboard } from '@/pages/Admin/AdminDashboard';
import { SOSManagement } from '@/pages/Admin/SosManagement/SosManagement';
import { AdminHikesPage } from '@/pages/Admin/Hikes/Hike';

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
  </Route>
);
