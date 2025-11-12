import { IPickupOTPService } from '../../application/services/IPickupOTPService';

export class PickupOTPService implements IPickupOTPService {
  generateOTP(): string {
    // Generate a 6-digit OTP
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  verifyOTP(taskOtp: string, providedOtp: string): boolean {
    return taskOtp === providedOtp;
  }
}
