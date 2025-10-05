export type otpPurpose = 'signup' | 'reset';

export interface User {
  id: string;
  email: string;
  fullName: string;
  mobile: string;
  createdAt: string;
}

export interface AuthState {
  loading: boolean;
  token: string | null;
  user: User | null;
}

export interface Admin {
  id: string;
  email: string;
}

export interface AdminAuthState {
  loading: boolean;
  token: string | null;
  admin: Admin | null;
}
