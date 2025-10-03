import type { RootState } from '@/store/store';
import type { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const Protected = ({ children }: { children: ReactNode }) => {
  const { token } = useSelector((state: RootState) => state.auth);
  if (!token) return <Navigate to={'/auth/sign-in'} replace />;
  return <>{children}</>;
};
