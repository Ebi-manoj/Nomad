import { useAuthRole } from '@/hooks/useAuthRole';
import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface protectedProps {
  children: ReactNode;
  allowedRole: 'user' | 'admin';
}

export const Protected = ({ children, allowedRole }: protectedProps) => {
  const payload = useAuthRole();
  console.log(payload);
  if (!payload.role || payload.role !== allowedRole)
    return <Navigate to={'/auth/sign-in'} replace />;
  return <>{children}</>;
};
