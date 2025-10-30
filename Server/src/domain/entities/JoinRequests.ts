import { JoinRequestStatus } from '../enums/Ride';

export interface JoinRequestProps {
  id?: string;
  rideId: string;
  hikeId: string;
  status: JoinRequestStatus;
  pickupLocation: GeoJSON.Point;
  dropoffLocation: GeoJSON.Point;

  createdAt?: Date;
  updatedAt?: Date;
}

export class JoinRequest {
  private readonly id?: string;
  private readonly rideId: string;
  private readonly hikeId: string;
  private status: JoinRequestStatus;
  private pickupLocation: GeoJSON.Point;
  private dropoffLocation: GeoJSON.Point;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(props: JoinRequestProps) {
    this.id = props.id;
    this.rideId = props.rideId;
    this.hikeId = props.hikeId;
    this.status = props.status || JoinRequestStatus.PENDING;
    this.pickupLocation = props.pickupLocation;
    this.dropoffLocation = props.dropoffLocation;
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = props.updatedAt || new Date();
  }

  // --- Getters ---
  getId() {
    return this.id;
  }

  getRideId() {
    return this.rideId;
  }

  getHikeId() {
    return this.hikeId;
  }

  getStatus() {
    return this.status;
  }

  getPickupLocation() {
    return this.pickupLocation;
  }

  getDropoffLocation() {
    return this.dropoffLocation;
  }

  getCreatedAt() {
    return this.createdAt;
  }

  getUpdatedAt() {
    return this.updatedAt;
  }

  // --- Setters / Domain Methods ---
  updateStatus(status: JoinRequestStatus) {
    this.status = status;
    this.updatedAt = new Date();
  }

  updatePickupLocation(location: GeoJSON.Point) {
    this.pickupLocation = location;
    this.updatedAt = new Date();
  }

  updateDropoffLocation(location: GeoJSON.Point) {
    this.dropoffLocation = location;
    this.updatedAt = new Date();
  }

  toJSON() {
    return {
      id: this.id,
      rideId: this.rideId,
      hikeId: this.hikeId,
      status: this.status,
      pickupLocation: this.pickupLocation,
      dropoffLocation: this.dropoffLocation,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
