import { HikeResponseDTO } from './HikeDTO';
import { RideResponseDTO } from './RideDTO';

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
  profilePic?: string;
  role: string;
  isBlocked: boolean;
  rating: number;
  safetyScore: number;
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
  activeRide: RideResponseDTO | null;
  activeHike: HikeResponseDTO | null;
}
