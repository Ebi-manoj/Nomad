export class Email {
  private readonly value: string;

  constructor(email: string) {
    const normalized = email.toLowerCase().trim();
    if (!this.isValid(normalized)) throw new Error('Invalid Email Format');
    this.value = normalized;
  }

  isValid(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
