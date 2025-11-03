import { PaymentStatus } from '../enums/payment';

export interface PaymentProps {
  id?: string;
  joinRequestId: string;
  hikerId: string;
  riderId: string;
  amount: number;
  platformFee: number;
  status: PaymentStatus;
  paymentMethod?: string;
  transactionId?: string;
  expiresAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Payment {
  private id?: string;
  private joinRequestId: string;
  private hikerId: string;
  private riderId: string;
  private amount: number;
  private platformFee: number;
  private status: PaymentStatus;
  private paymentMethod?: string;
  private transactionId?: string;
  private expiresAt: Date;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(props: PaymentProps) {
    this.id = props.id;
    this.joinRequestId = props.joinRequestId;
    this.hikerId = props.hikerId;
    this.riderId = props.riderId;
    this.amount = props.amount;
    this.platformFee = props.platformFee;
    this.status = props.status;
    this.paymentMethod = props.paymentMethod;
    this.transactionId = props.transactionId;
    this.expiresAt = props.expiresAt;
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = props.updatedAt || new Date();
  }

  getId(): string | undefined {
    return this.id;
  }

  getJoinRequestId(): string {
    return this.joinRequestId;
  }

  getHikerId(): string {
    return this.hikerId;
  }

  getRiderId(): string {
    return this.riderId;
  }

  getAmount(): number {
    return this.amount;
  }

  getPlatformFee(): number {
    return this.platformFee;
  }

  getStatus(): PaymentStatus {
    return this.status;
  }

  getPaymentMethod(): string | undefined {
    return this.paymentMethod;
  }

  getTransactionId(): string | undefined {
    return this.transactionId;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }
  getExpiresAt(): Date {
    return this.expiresAt;
  }
}
