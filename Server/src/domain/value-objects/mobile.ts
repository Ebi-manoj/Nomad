export class Mobile {
  private readonly value;
  constructor(mobile: string) {
    const normalized = mobile.trim();
    if (!this.isValid(normalized)) throw new Error('Mobile is not Valid');
    this.value = normalized;
  }

  isValid(mobile: string) {
    return /^[6-9]\d{9}$/.test(mobile);
  }
  getValue() {
    return this.value;
  }
}
