import { HikeStatus } from '../enums/Hike';

export interface HikeProps {
  hikeId?: string;
  userId: string;
  pickup: GeoJSON.Point;
  destination: GeoJSON.Point;
  pickupAddress: string;
  destinationAddress: string;
  totalDistance: number;
  hasHelmet: boolean;
  seatsRequested: number;
  riderId?: string | null;
  status: HikeStatus;
  confirmed?: boolean;
  createdAt?: Date;
}

export class HikeLog {
  private readonly hikeId?: string;
  private userId: string;
  private pickup: GeoJSON.Point;
  private destination: GeoJSON.Point;
  private pickupAddress: string;
  private destinationAddress: string;
  private totalDistance: number;
  private hasHelmet: boolean;
  private seatsRequested: number;
  private riderId: string | null;
  private status: string;
  private confirmed: boolean;
  private readonly createdAt: Date;

  constructor(props: HikeProps) {
    this.hikeId = props.hikeId;
    this.userId = props.userId;
    this.pickup = props.pickup;
    this.destination = props.destination;
    this.pickupAddress = props.pickupAddress;
    this.destinationAddress = props.destinationAddress;
    this.totalDistance = props.totalDistance;
    this.hasHelmet = props.hasHelmet;
    this.seatsRequested = props.seatsRequested;
    this.riderId = props.riderId || null;
    this.status = props.status;
    this.confirmed = props.confirmed || false;
    this.createdAt = props.createdAt || new Date();
  }

  // Getters
  getHikeId() {
    return this.hikeId;
  }
  getUserId() {
    return this.userId;
  }
  getPickup() {
    return this.pickup;
  }
  getDestination() {
    return this.destination;
  }
  getTotalDistance() {
    return this.totalDistance;
  }
  getHasHelmet() {
    return this.hasHelmet;
  }
  getSeatsRequested() {
    return this.seatsRequested;
  }
  getRiderId() {
    return this.riderId;
  }
  getStatus() {
    return this.status;
  }
  getConfirmed() {
    return this.confirmed;
  }
  getCreatedAt() {
    return this.createdAt;
  }

  toggleConfirmed() {
    this.confirmed = !this.confirmed;
  }

  assignRider(riderId: string) {
    this.riderId = riderId;
  }

  updateStatus(newStatus: string) {
    this.status = newStatus;
  }

  updateDistance(newDistance: number) {
    this.totalDistance = newDistance;
  }
}
