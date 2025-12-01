import { PaymentStatus } from '../enums/payment';

export interface PaymentProps {
  id?: string;
  joinRequestId: string;
  hikerId: string;
  riderId: string;
  hikeId: string;
  rideId: string;
  amount: number;
  platformFee: number;
  status: PaymentStatus;
  paymentMethod?: string;
  stripePaymentId?: string;
  expiresAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Payment {
  private id?: string;
  private joinRequestId: string;
  private hikerId: string;
  private riderId: string;
  private hikeId: string;
  private rideId: string;
  private amount: number;
  private platformFee: number;
  private status: PaymentStatus;
  private paymentMethod?: string;
  private stripePaymentId?: string;
  private expiresAt: Date;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(props: PaymentProps) {
    this.id = props.id;
    this.joinRequestId = props.joinRequestId;
    this.hikerId = props.hikerId;
    this.riderId = props.riderId;
    this.hikeId = props.hikeId;
    this.rideId = props.rideId;
    this.amount = props.amount;
    this.platformFee = props.platformFee;
    this.status = props.status;
    this.paymentMethod = props.paymentMethod;
    this.stripePaymentId = props.stripePaymentId;
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
  getHikeId(): string {
    return this.hikeId;
  }

  getRideId(): string {
    return this.rideId;
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

  getStripPaymentId(): string | undefined {
    return this.stripePaymentId;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }
  getExpiresAt(): Date {
    return this.expiresAt;
  }
  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  setStripePaymentId(id: string) {
    this.stripePaymentId = id;
  }

  setExpired() {
    this.status = PaymentStatus.EXPIRED;
  }
  success() {
    this.status = PaymentStatus.SUCCESS;
  }
}
