export interface WalletProps {
  id?: string;
  userId: string;
  balance?: number;
  currency?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Wallet {
  private _id?: string;
  private _userId: string;
  private _balance: number;
  private _currency: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: WalletProps) {
    this._id = props.id;
    this._userId = props.userId;
    this._balance = props.balance ?? 0;
    this._currency = props.currency ?? 'INR';
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
  }

  getId(): string | undefined {
    return this._id;
  }

  getUserId(): string {
    return this._userId;
  }

  getBalance(): number {
    return this._balance;
  }

  getCurrency(): string {
    return this._currency;
  }

  getCreatedAt(): Date {
    return this._createdAt;
  }

  getUpdatedAt(): Date {
    return this._updatedAt;
  }

  credit(amount: number): void {
    if (amount <= 0) return;
    this._balance = Number((this._balance + amount).toFixed(2));
    this._updatedAt = new Date();
  }

  debit(amount: number): void {
    if (amount <= 0) return;
    if (amount > this._balance) {
      throw new Error('Insufficient wallet balance');
    }
    this._balance = Number((this._balance - amount).toFixed(2));
    this._updatedAt = new Date();
  }
}
