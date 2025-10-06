export type otpPurpose = 'signup' | 'reset';

export interface User {
  id: string;
  email: string;
  fullName: string;
  mobile: string;
  isBlocked: boolean;
  createdAt: string;
}

export interface AuthState {
  loading: boolean;
  token: string | null;
  user: User | null;
}
