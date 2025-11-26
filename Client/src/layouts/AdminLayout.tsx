import { AdminSidebar } from '@/components/AdminSidebar';
import { Outlet } from 'react-router-dom';

export const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-white">
      <AdminSidebar />
      <main className="ml-64 flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};
