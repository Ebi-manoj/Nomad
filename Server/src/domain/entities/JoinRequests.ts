import { JoinRequestStatus } from '../enums/Ride';

export interface JoinRequestProps {
  id?: string;
  rideId: string;
  hikeId: string;
  status: JoinRequestStatus;
  pickupLocation: GeoJSON.Point;
  dropoffLocation: GeoJSON.Point;
  seatsRequested: number;
  costSharing: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class JoinRequest {
  private readonly _id?: string;
  private readonly _rideId: string;
  private readonly _hikeId: string;
  private _status: JoinRequestStatus;
  private _pickupLocation: GeoJSON.Point;
  private _dropoffLocation: GeoJSON.Point;
  private _seatsRequested: number;
  private _costSharing: number;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: JoinRequestProps) {
    this._id = props.id;
    this._rideId = props.rideId;
    this._hikeId = props.hikeId;
    this._status = props.status || JoinRequestStatus.PENDING;
    this._pickupLocation = props.pickupLocation;
    this._dropoffLocation = props.dropoffLocation;
    this._seatsRequested = props.seatsRequested;
    this._costSharing = props.costSharing;
    this._createdAt = props.createdAt || new Date();
    this._updatedAt = props.updatedAt || new Date();
  }

  // --- Getters ---
  getId() {
    return this._id;
  }

  getRideId() {
    return this._rideId;
  }

  getHikeId() {
    return this._hikeId;
  }

  getStatus() {
    return this._status;
  }

  getPickupLocation() {
    return this._pickupLocation;
  }

  getDropoffLocation() {
    return this._dropoffLocation;
  }

  getCostSharing() {
    return this._costSharing;
  }

  getCreatedAt() {
    return this._createdAt;
  }

  getUpdatedAt() {
    return this._updatedAt;
  }

  getSeatsRequested() {
    return this._seatsRequested;
  }

  accept() {
    this._status = JoinRequestStatus.ACCEPTED;
  }
  confirm() {
    this._status = JoinRequestStatus.CONFIRMED;
  }
  updateStatus(status: JoinRequestStatus) {
    this._status = status;
    this._updatedAt = new Date();
  }

  updatePickupLocation(location: GeoJSON.Point) {
    this._pickupLocation = location;
    this._updatedAt = new Date();
  }

  updateDropoffLocation(location: GeoJSON.Point) {
    this._dropoffLocation = location;
    this._updatedAt = new Date();
  }

  updateCostSharing(cost: number) {
    this._costSharing = cost;
    this._updatedAt = new Date();
  }

  toJSON() {
    return {
      id: this._id,
      rideId: this._rideId,
      hikeId: this._hikeId,
      status: this._status,
      pickupLocation: this._pickupLocation,
      dropoffLocation: this._dropoffLocation,
      costSharing: this._costSharing,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }
}
