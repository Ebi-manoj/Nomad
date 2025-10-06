import { AdminSidebar } from '@/components/AdminSidebar';
import { Input } from '@/components/ui/input';
import { UserTable } from '@/components/UserTable';
import { Search } from 'lucide-react';

export const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="ml-64 flex-1 p-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
            <Input type="search" placeholder="Search users" className="pl-10" />
          </div>

          <UserTable />
        </div>
      </main>
    </div>
  );
};
