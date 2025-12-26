import type { PayoutMode } from '../dto/Payouts';

export type PayoutStatus =
  | 'queued'
  | 'pending'
  | 'processing'
  | 'processed'
  | 'reversed'
  | 'cancelled';

export interface PayoutProps {
  id?: string;
  userId: string;
  transactionId: string;
  razorpayPayoutId: string;
  contactId: string;
  fundAccountId: string;
  amount: number;
  mode: PayoutMode;
  status: PayoutStatus;
  utr?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Payout {
  private readonly _id?: string;
  private readonly _userId: string;
  private readonly _razorpayPayoutId: string;
  private readonly _contactId: string;
  private readonly _fundAccountId: string;
  private readonly _amount: number;
  private readonly _mode: PayoutMode;
  private _status: PayoutStatus;
  private readonly _transactionId: string;
  private readonly _utr?: string;
  private readonly _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: PayoutProps) {
    this._id = props.id;
    this._userId = props.userId;
    this._transactionId = props.transactionId;
    this._razorpayPayoutId = props.razorpayPayoutId;
    this._contactId = props.contactId;
    this._fundAccountId = props.fundAccountId;
    this._amount = props.amount;
    this._mode = props.mode;
    this._status = props.status;
    this._utr = props.utr;
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
  }

  getId(): string | undefined {
    return this._id;
  }
  getUserId(): string {
    return this._userId;
  }
  getTransactionId(): string | undefined {
    return this._transactionId;
  }
  getRazorpayPayoutId(): string {
    return this._razorpayPayoutId;
  }
  getContactId(): string {
    return this._contactId;
  }
  getFundAccountId(): string {
    return this._fundAccountId;
  }
  getAmount(): number {
    return this._amount;
  }
  getMode(): PayoutMode {
    return this._mode;
  }
  getStatus(): PayoutStatus {
    return this._status;
  }
  setStatus(status: PayoutStatus) {
    this._status = status;
    this._updatedAt = new Date();
  }
  getUtr(): string | undefined {
    return this._utr;
  }
  getCreatedAt(): Date {
    return this._createdAt;
  }
  getUpdatedAt(): Date {
    return this._updatedAt;
  }
}
