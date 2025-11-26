import { SosLogStatus } from '../enums/SosLogStatus';
import { SosInitiator } from '../enums/SosInitiator';

export interface SosLogProps {
  id?: string;
  userId: string;
  bookingId?: string;
  rideId?: string;
  location: GeoJSON.Point;
  initiatedBy: SosInitiator;
  status?: SosLogStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export class SosLog {
  private readonly id?: string;
  private readonly userId: string;
  private readonly bookingId?: string;
  private readonly rideId?: string;
  private readonly location: GeoJSON.Point;
  private readonly initiatedBy: SosInitiator;
  private status: SosLogStatus;
  private readonly createdAt: Date;
  private readonly updatedAt: Date;

  constructor(props: SosLogProps) {
    this.id = props.id;
    this.userId = props.userId;
    this.bookingId = props.bookingId;
    this.rideId = props.rideId;
    this.location = props.location;
    this.initiatedBy = props.initiatedBy;
    this.status = props.status ?? SosLogStatus.OPEN;
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = props.updatedAt || new Date();
  }

  getId() {
    return this.id;
  }

  getUserId() {
    return this.userId;
  }

  getBookingId() {
    return this.bookingId;
  }

  getRideId() {
    return this.rideId;
  }

  getLocation() {
    return this.location;
  }

  getInitiatedBy() {
    return this.initiatedBy;
  }

  getStatus() {
    return this.status;
  }

  setStatus(status: SosLogStatus) {
    this.status = status;
  }

  getCreatedAt() {
    return this.createdAt;
  }

  getUpdatedAt() {
    return this.updatedAt;
  }
  resolve() {
    this.status = SosLogStatus.RESOLVED;
  }
}
