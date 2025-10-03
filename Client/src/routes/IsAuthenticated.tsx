import type { RootState } from '@/store/store';
import type { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const IsAuthenticated = ({ children }: { children: ReactNode }) => {
  const { token } = useSelector((state: RootState) => state.auth);
  if (token) return <Navigate to={'/home'} replace />;
  return <>{children}</>;
};
