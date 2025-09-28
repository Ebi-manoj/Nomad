export class OTP {
  private readonly value: string;

  constructor(otp: string) {
    const regex = /^\d{6}$/;
    otp = otp.trim();
    if (!regex.test(otp)) throw new Error('Invalid OTP Format');
    this.value = otp;
  }

  getValue() {
    return this.value;
  }
}
