export interface IOTPRepository {
  saveOTP(email: string, otp: string, ttl: number): Promise<void>;
  getOTP(email: string): Promise<string | null>;
}
