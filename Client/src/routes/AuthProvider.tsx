import { useAppDispatch } from '@/hooks/useAppDispatch';
import { refreshToken } from '@/store/features/auth/authSlice';
import type { RootState } from '@/store/store';
import { useEffect, useState, type ReactNode } from 'react';
import { useSelector } from 'react-redux';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { token, loading } = useSelector((state: RootState) => state.auth);
  const [isChecking, setIschecking] = useState(true);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const checkAuth = async function () {
      if (!token) {
        try {
          await dispatch(refreshToken()).unwrap();
        } catch (error) {}
      }
      setIschecking(false);
    };
    checkAuth();
  }, [token]);
  if (isChecking || loading) {
    return <div>Loading...</div>;
  }
  return <>{children}</>;
};
