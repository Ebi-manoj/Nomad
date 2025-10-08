import { Route, Routes } from 'react-router-dom';
import { AuthRoutes } from './Auth.routes';
import { UserRoutes } from './User.routes';
import { Landing } from '@/pages/Landing';
import { AdminRoutes } from './Admin.routes';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      {AuthRoutes}
      {UserRoutes}
      {AdminRoutes}
    </Routes>
  );
}
