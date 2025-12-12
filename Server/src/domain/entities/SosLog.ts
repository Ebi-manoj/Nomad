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
  private readonly _id?: string;
  private readonly _userId: string;
  private readonly _bookingId?: string;
  private readonly _rideId?: string;
  private readonly _location: GeoJSON.Point;
  private readonly _initiatedBy: SosInitiator;
  private _status: SosLogStatus;
  private readonly _createdAt: Date;
  private readonly _updatedAt: Date;

  constructor(props: SosLogProps) {
    this._id = props.id;
    this._userId = props.userId;
    this._bookingId = props.bookingId;
    this._rideId = props.rideId;
    this._location = props.location;
    this._initiatedBy = props.initiatedBy;
    this._status = props.status ?? SosLogStatus.OPEN;
    this._createdAt = props.createdAt || new Date();
    this._updatedAt = props.updatedAt || new Date();
  }

  getId() {
    return this._id;
  }

  getUserId() {
    return this._userId;
  }

  getBookingId() {
    return this._bookingId;
  }

  getRideId() {
    return this._rideId;
  }

  getLocation() {
    return this._location;
  }

  getInitiatedBy() {
    return this._initiatedBy;
  }

  getStatus() {
    return this._status;
  }

  setStatus(status: SosLogStatus) {
    this._status = status;
  }

  getCreatedAt() {
    return this._createdAt;
  }

  getUpdatedAt() {
    return this._updatedAt;
  }
  resolve() {
    this._status = SosLogStatus.RESOLVED;
  }
}
