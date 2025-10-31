import { RideLog } from '../entities/Ride';
import { HikeResponseDTO } from './HikeDTO';

export interface RegisterUserRequestDTO {
  fullName: string;
  email: string;
  mobile: string;
  password: string;
}

export interface UserResponseDTO {
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

export interface LoginUserRequestDTO {
  email: string;
  password: string;
}

export interface LoginuserResponseDTO {
  accessToken: string;
  refreshToken: string;
  user: UserResponseDTO;
}

export interface SentOTPRequestDTO {
  email: string;
}

export interface SentOTPResponseDTO {
  email: string;
  expiry: number;
  message: string;
}

export interface VerifyOTPRequestDTO {
  email: string;
  otp: string;
}

export interface VerifyOTPResponseDTO {
  email: string;
  verificationToken: string;
  message: string;
}

export interface ResetPasswordRequestDTO {
  email: string;
  password: string;
}

export interface RefreshTokenRequestDTO {
  refreshToken: string;
}

export interface ActiveSession {
  activeRide: HikeResponseDTO | null;
  activeHike: RideLog | null;
}
