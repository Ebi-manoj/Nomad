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
  pickupLocation: GeoJSON.Point;
  dropoffLocation: GeoJSON.Point;
  status: RideBookingStatus;
  createdAt?: Date;
  updatedAt?: Date;
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
  private pickupLocation: GeoJSON.Point;
  private dropoffLocation: GeoJSON.Point;
  private status: RideBookingStatus;
  private createdAt: Date;
  private updatedAt: Date;

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
    this.pickupLocation = props.pickupLocation;
    this.dropoffLocation = props.dropoffLocation;
    this.status = props.status;
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = props.updatedAt || new Date();
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

  getPickupLocation() {
    return this.pickupLocation;
  }

  getDropoffLocation() {
    return this.dropoffLocation;
  }

  getStatus(): RideBookingStatus {
    return this.status;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }
  getCostShared() {
    return this.amount - this.platformFee;
  }

  confirm() {
    this.status = RideBookingStatus.CONFIRMED;
    this.updatedAt = new Date();
  }

  cancel() {
    this.status = RideBookingStatus.CANCELLED;
    this.updatedAt = new Date();
  }

  complete() {
    this.status = RideBookingStatus.COMPLETED;
    this.updatedAt = new Date();
  }
}
