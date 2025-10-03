import { UserNavbar } from '@/components/UserNavbar';
import { Outlet } from 'react-router-dom';

export const HomeLayout = () => {
  return (
    <div className="bg-white text-gray-900">
      <UserNavbar />
      <Outlet />
    </div>
  );
};
