import { RideBookingStatus } from '../enums/RideBooking';

export interface RideBookingProps {
  id?: string;
  rideId: string;
  hikerId: string;
  riderId: string;
  hikeId: string;
  joinRequestId: string;
  paymentId: string;
  bookingNumber: string;
  seatsBooked: number;
  totalDistance: number;
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
  private _id?: string;
  private _rideId: string;
  private _hikerId: string;
  private _riderId: string;
  private _hikeId: string;
  private _joinRequestId: string;
  private _paymentId: string;
  private _bookingNumber: string;
  private _totalDistance: number;
  private _seatsBooked: number;
  private _amount: number;
  private _platformFee: number;
  private _riderInitialLocation: GeoJSON.Point;
  private _pickupLocation: GeoJSON.Point;
  private _dropoffLocation: GeoJSON.Point;
  private _status: RideBookingStatus;
  private _completedAt?: Date;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _refundedAmount: number;
  private _cancelledAt?: Date;

  constructor(props: RideBookingProps) {
    this._id = props.id;
    this._rideId = props.rideId;
    this._hikerId = props.hikerId;
    this._riderId = props.riderId;
    this._hikeId = props.hikeId;
    this._joinRequestId = props.joinRequestId;
    this._paymentId = props.paymentId;
    this._bookingNumber = props.bookingNumber;
    this._seatsBooked = props.seatsBooked;
    this._amount = props.amount;
    this._totalDistance = props.totalDistance;
    this._platformFee = props.platformFee;
    this._riderInitialLocation = props.riderInitialLocation;
    this._pickupLocation = props.pickupLocation;
    this._dropoffLocation = props.dropoffLocation;
    this._status = props.status;
    this._completedAt = props.completedAt;
    this._createdAt = props.createdAt || new Date();
    this._updatedAt = props.updatedAt || new Date();
    this._refundedAmount = props.refundedAmount || 0;
    this._cancelledAt = props.cancelledAt;
  }

  //Getters
  getId(): string | undefined {
    return this._id;
  }

  getRideId(): string {
    return this._rideId;
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

  getJoinRequestId(): string {
    return this._joinRequestId;
  }

  getPaymentId(): string {
    return this._paymentId;
  }

  getBookingNumber(): string {
    return this._bookingNumber;
  }

  getSeatsBooked(): number {
    return this._seatsBooked;
  }

  getAmount(): number {
    return this._amount;
  }

  getPlatformFee(): number {
    return this._platformFee;
  }

  getRiderInitialLocation() {
    return this._riderInitialLocation;
  }

  getPickupLocation() {
    return this._pickupLocation;
  }

  getDropoffLocation() {
    return this._dropoffLocation;
  }

  getStatus(): RideBookingStatus {
    return this._status;
  }

  getCompletedAt(): Date | undefined {
    return this._completedAt;
  }
  getCreatedAt(): Date {
    return this._createdAt;
  }

  getUpdatedAt(): Date {
    return this._updatedAt;
  }
  getRefundedAmount(): number {
    return this._refundedAmount;
  }
  getCancelledAt(): Date | undefined {
    return this._cancelledAt;
  }
  getCostShared() {
    return this._amount - this._platformFee;
  }
  getTotalDistance() {
    return this._totalDistance;
  }

  getRiderEarning() {
    return this._amount - this._refundedAmount - this._platformFee;
  }

  confirm() {
    this._status = RideBookingStatus.CONFIRMED;
    this._updatedAt = new Date();
  }

  cancel() {
    this._status = RideBookingStatus.CANCELLED;
    this._cancelledAt = new Date();
    this._updatedAt = new Date();
  }

  complete() {
    this._status = RideBookingStatus.COMPLETED;
    this._updatedAt = new Date();
  }
  setStatus(status: RideBookingStatus) {
    this._status = status;
    this._updatedAt = new Date();
  }
  markDroppedOff() {
    this._status = RideBookingStatus.DROPPEDOFF;
    this._updatedAt = new Date();
    this._completedAt = new Date();
  }

  setRefundedAmount(amount: number) {
    this._refundedAmount = amount;
    this._updatedAt = new Date();
  }
}
