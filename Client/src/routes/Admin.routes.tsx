import { Route } from 'react-router-dom';
import { Protected } from './Protected';
import { AdminLayout } from '@/layouts/AdminLayout';
import { AdminDashboard } from '@/pages/Admin/adminDashboard';
import { UserMangement } from '@/pages/Admin/UserManagement';

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
  </Route>
);
