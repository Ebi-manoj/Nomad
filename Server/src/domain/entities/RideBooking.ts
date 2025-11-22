import { RideBookingStatus } from '../enums/RideBooking';

export interface RideBookingProps {
  id?: string;
  rideId: string;
  hikerId: string;
  riderId: string;
  hikeId: string;
  joinRequestId: string;
  paymentId: string;
  seatsBooked: number;
  amount: number;
  platformFee: number;
  riderInitialLocation: GeoJSON.Point;
  pickupLocation: GeoJSON.Point;
  dropoffLocation: GeoJSON.Point;
  status: RideBookingStatus;
  completedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  refundedAmount?: number;
  cancelledAt?: Date;
}

export class RideBooking {
  private id?: string;
  private rideId: string;
  private hikerId: string;
  private riderId: string;
  private hikeId: string;
  private joinRequestId: string;
  private paymentId: string;
  private seatsBooked: number;
  private amount: number;
  private platformFee: number;
  private riderInitialLocation: GeoJSON.Point;
  private pickupLocation: GeoJSON.Point;
  private dropoffLocation: GeoJSON.Point;
  private status: RideBookingStatus;
  private completedAt?: Date;
  private createdAt: Date;
  private updatedAt: Date;
  private refundedAmount: number;
  private cancelledAt?: Date;

  constructor(props: RideBookingProps) {
    this.id = props.id;
    this.rideId = props.rideId;
    this.hikerId = props.hikerId;
    this.riderId = props.riderId;
    this.hikeId = props.hikeId;
    this.joinRequestId = props.joinRequestId;
    this.paymentId = props.paymentId;
    this.seatsBooked = props.seatsBooked;
    this.amount = props.amount;
    this.platformFee = props.platformFee;
    this.riderInitialLocation = props.riderInitialLocation;
    this.pickupLocation = props.pickupLocation;
    this.dropoffLocation = props.dropoffLocation;
    this.status = props.status;
    this.completedAt = props.completedAt;
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = props.updatedAt || new Date();
    this.refundedAmount = props.refundedAmount || 0;
    this.cancelledAt = props.cancelledAt;
  }

  //Getters
  getId(): string | undefined {
    return this.id;
  }

  getRideId(): string {
    return this.rideId;
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

  getJoinRequestId(): string {
    return this.joinRequestId;
  }

  getPaymentId(): string {
    return this.paymentId;
  }

  getSeatsBooked(): number {
    return this.seatsBooked;
  }

  getAmount(): number {
    return this.amount;
  }

  getPlatformFee(): number {
    return this.platformFee;
  }

  getRiderInitialLocation() {
    return this.riderInitialLocation;
  }

  getPickupLocation() {
    return this.pickupLocation;
  }

  getDropoffLocation() {
    return this.dropoffLocation;
  }

  getStatus(): RideBookingStatus {
    return this.status;
  }

  getCompletedAt(): Date | undefined {
    return this.completedAt;
  }
  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }
  getRefundedAmount(): number {
    return this.refundedAmount;
  }
  getCancelledAt(): Date | undefined {
    return this.cancelledAt;
  }
  getCostShared() {
    return this.amount - this.platformFee;
  }

  getRiderEarning() {
    return this.amount - this.refundedAmount - this.platformFee;
  }

  confirm() {
    this.status = RideBookingStatus.CONFIRMED;
    this.updatedAt = new Date();
  }

  cancel() {
    this.status = RideBookingStatus.CANCELLED;
    this.cancelledAt = new Date();
    this.updatedAt = new Date();
  }

  complete() {
    this.status = RideBookingStatus.COMPLETED;
    this.updatedAt = new Date();
  }
  setStatus(status: RideBookingStatus) {
    this.status = status;
    this.updatedAt = new Date();
  }
  markDroppedOff() {
    this.status = RideBookingStatus.DROPPEDOFF;
    this.updatedAt = new Date();
    this.completedAt = new Date();
  }

  setRefundedAmount(amount: number) {
    this.refundedAmount = amount;
    this.updatedAt = new Date();
  }
}
