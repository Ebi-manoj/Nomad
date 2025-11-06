import { HikeLog } from '../entities/Hike';
import { RideLog } from '../entities/Ride';

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

export interface RefreshTokenResponseDTO {
  accessToken: string;
  user: UserResponseDTO;
}

export interface ActiveSession {
  activeRide: RideLog | null;
  activeHike: HikeLog | null;
}
