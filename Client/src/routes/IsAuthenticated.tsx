import { useAuthRole } from '@/hooks/useAuthRole';
import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

export const IsAuthenticated = ({ children }: { children: ReactNode }) => {
  const { role } = useAuthRole();
  if (role == 'admin') return <Navigate to={'/admin'} replace />;
  if (role == 'user') return <Navigate to={'/hike'} replace />;
  return <>{children}</>;
};
