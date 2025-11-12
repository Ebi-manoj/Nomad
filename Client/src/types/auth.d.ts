export type otpPurpose = 'signup' | 'reset';

export interface User {
  id: string;
  fullName: string;
  email: string;
  mobile: string | undefined;
  role: string;
  isBlocked: boolean;
  aadhaarVerified: boolean;
  licenceVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthState {
  loading: boolean;
  token: string | null;
  user: User | null;
}
