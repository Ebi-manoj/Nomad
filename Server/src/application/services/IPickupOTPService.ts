export interface IPickupOTPService {
  generateOTP(): string;
  verifyOTP(taskOtp: string, providedOtp: string): boolean;
}
