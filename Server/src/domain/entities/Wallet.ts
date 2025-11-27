export interface WalletProps {
  id?: string;
  userId: string;
  balance?: number;
  currency?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Wallet {
  private id?: string;
  private userId: string;
  private balance: number;
  private currency: string;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(props: WalletProps) {
    this.id = props.id;
    this.userId = props.userId;
    this.balance = props.balance ?? 0;
    this.currency = props.currency ?? 'INR';
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
  }

  getId(): string | undefined {
    return this.id;
  }

  getUserId(): string {
    return this.userId;
  }

  getBalance(): number {
    return this.balance;
  }

  getCurrency(): string {
    return this.currency;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  credit(amount: number): void {
    if (amount <= 0) return;
    this.balance = Number((this.balance + amount).toFixed(2));
    this.updatedAt = new Date();
  }

  debit(amount: number): void {
    if (amount <= 0) return;
    if (amount > this.balance) {
      throw new Error('Insufficient wallet balance');
    }
    this.balance = Number((this.balance - amount).toFixed(2));
    this.updatedAt = new Date();
  }
}
