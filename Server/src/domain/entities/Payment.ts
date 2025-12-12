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
  private _id?: string;
  private _joinRequestId: string;
  private _hikerId: string;
  private _riderId: string;
  private _hikeId: string;
  private _rideId: string;
  private _amount: number;
  private _platformFee: number;
  private _status: PaymentStatus;
  private _paymentMethod?: string;
  private _stripePaymentId?: string;
  private _expiresAt: Date;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: PaymentProps) {
    this._id = props.id;
    this._joinRequestId = props.joinRequestId;
    this._hikerId = props.hikerId;
    this._riderId = props.riderId;
    this._hikeId = props.hikeId;
    this._rideId = props.rideId;
    this._amount = props.amount;
    this._platformFee = props.platformFee;
    this._status = props.status;
    this._paymentMethod = props.paymentMethod;
    this._stripePaymentId = props.stripePaymentId;
    this._expiresAt = props.expiresAt;
    this._createdAt = props.createdAt || new Date();
    this._updatedAt = props.updatedAt || new Date();
  }

  getId(): string | undefined {
    return this._id;
  }

  getJoinRequestId(): string {
    return this._joinRequestId;
  }

  getHikerId(): string {
    return this._hikerId;
  }

  getRiderId(): string {
    return this._riderId;
  }
  getHikeId(): string {
    return this._hikeId;
  }

  getRideId(): string {
    return this._rideId;
  }

  getAmount(): number {
    return this._amount;
  }

  getPlatformFee(): number {
    return this._platformFee;
  }

  getStatus(): PaymentStatus {
    return this._status;
  }

  getPaymentMethod(): string | undefined {
    return this._paymentMethod;
  }

  getStripPaymentId(): string | undefined {
    return this._stripePaymentId;
  }

  getCreatedAt(): Date {
    return this._createdAt;
  }
  getExpiresAt(): Date {
    return this._expiresAt;
  }
  getUpdatedAt(): Date {
    return this._updatedAt;
  }

  setStripePaymentId(id: string) {
    this._stripePaymentId = id;
  }

  setExpired() {
    this._status = PaymentStatus.EXPIRED;
  }
  success() {
    this._status = PaymentStatus.SUCCESS;
  }
}
