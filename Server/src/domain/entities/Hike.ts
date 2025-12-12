import { COST_SHARING_LIMIT } from '../enums/Constants';
import { HikeStatus } from '../enums/Hike';

export interface HikeProps {
  id?: string;
  userId: string;
  pickup: GeoJSON.Point;
  destination: GeoJSON.Point;
  pickupAddress: string;
  destinationAddress: string;
  totalDistance: number;
  hasHelmet: boolean;
  seatsRequested: number;
  riderId?: string | null;
  bookingId?: string | null;
  status: HikeStatus;
  confirmed?: boolean;
  createdAt?: Date;
}

export class HikeLog {
  private readonly _id?: string;
  private _userId: string;
  private _pickup: GeoJSON.Point;
  private _destination: GeoJSON.Point;
  private _pickupAddress: string;
  private _destinationAddress: string;
  private _totalDistance: number;
  private _hasHelmet: boolean;
  private _seatsRequested: number;
  private _riderId: string | null;
  private _bookingId: string | null;
  private _status: HikeStatus;
  private _confirmed: boolean;
  private readonly _createdAt: Date;

  constructor(props: HikeProps) {
    this._id = props.id;
    this._userId = props.userId;
    this._pickup = props.pickup;
    this._destination = props.destination;
    this._pickupAddress = props.pickupAddress;
    this._destinationAddress = props.destinationAddress;
    this._totalDistance = props.totalDistance;
    this._hasHelmet = props.hasHelmet;
    this._seatsRequested = props.seatsRequested;
    this._riderId = props.riderId || null;
    this._bookingId = props.bookingId || null;
    this._status = props.status;
    this._confirmed = props.confirmed || false;
    this._createdAt = props.createdAt || new Date();
  }

  // Getters
  getHikeId() {
    return this._id;
  }
  getUserId() {
    return this._userId;
  }
  getPickup() {
    return this._pickup;
  }
  getDestination() {
    return this._destination;
  }
  getTotalDistance() {
    return this._totalDistance;
  }
  getHasHelmet() {
    return this._hasHelmet;
  }
  getSeatsRequested() {
    return this._seatsRequested;
  }
  getRiderId() {
    return this._riderId;
  }
  getStatus() {
    return this._status;
  }
  getConfirmed() {
    return this._confirmed;
  }
  getCreatedAt() {
    return this._createdAt;
  }
  getDestinationAddress() {
    return this._destinationAddress;
  }
  getPickupAddress() {
    return this._pickupAddress;
  }
  getBookingId() {
    return this._bookingId;
  }
  setBookingId(bookingId: string) {
    this._bookingId = bookingId;
  }

  toggleConfirmed() {
    this._confirmed = !this._confirmed;
  }

  assignRider(riderId: string) {
    this._riderId = riderId;
  }

  updateStatus(newStatus: HikeStatus) {
    this._status = newStatus;
  }

  updateDistance(newDistance: number) {
    this._totalDistance = newDistance;
  }
  getEstimatedPrice(): number {
    return +(this._totalDistance * COST_SHARING_LIMIT).toFixed(2);
  }

  complete() {
    this._status = HikeStatus.COMPLETED;
  }
}
