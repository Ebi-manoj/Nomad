export type otpPurpose = 'signup' | 'reset';

export interface User {
  id: string;
  email: string;
  fullName: string;
  mobile: string;
  createdAt: string;
}

export interface AuthState {
  token: string | null;
  user: User | null;
}
