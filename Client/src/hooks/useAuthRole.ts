import type { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  role: string | null;
}

export const useAuthRole = (): JwtPayload => {
  const { token } = useSelector((state: RootState) => state.auth);

  if (!token) return { role: null };
  try {
    const payload = jwtDecode<JwtPayload>(token);
    return {
      role: payload.role,
    };
  } catch (error) {
    return { role: null };
  }
};
