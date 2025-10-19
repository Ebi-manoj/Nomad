import { RideStatus, VehicleType } from '../enums/Ride';

export interface RideProps {
  id?: string;
  userId: string;
  pickup: GeoJSON.Point;
  destination: GeoJSON.Point;
  pickupAddress: string;
  destinationAddress: string;
  totalDistance: number;
  vehicleType: VehicleType;
  vehicleModel: string;
  vehicleNumber: string;
  hasHelmet: boolean;
  seatsAvailable: number;
  costSharing: number;
  hikersMatched?: string[];
  status: RideStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export class RideLog {
  private readonly id?: string;
  private userId: string;
  private pickup: GeoJSON.Point;
  private destination: GeoJSON.Point;
  private pickupAddress: string;
  private destinationAddress: string;
  private totalDistance: number;
  private vehicleType: VehicleType;
  private vehicleModel: string;
  private vehicleNumber: string;
  private hasHelmet: boolean;
  private seatsAvailable: number;
  private costSharing: number;
  private hikersMatched: string[];
  private status: RideStatus;
  private readonly createdAt: Date;
  private updatedAt: Date;

  constructor(props: RideProps) {
    this.id = props.id;
    this.userId = props.userId;
    this.pickup = props.pickup;
    this.destination = props.destination;
    this.pickupAddress = props.pickupAddress;
    this.destinationAddress = props.destinationAddress;
    this.totalDistance = props.totalDistance;
    this.vehicleType = props.vehicleType;
    this.vehicleModel = props.vehicleModel;
    this.vehicleNumber = props.vehicleNumber;
    this.hasHelmet = props.hasHelmet;
    this.seatsAvailable = props.seatsAvailable;
    this.costSharing = props.costSharing;
    this.hikersMatched = props.hikersMatched || [];
    this.status = props.status || 'ACTIVE';
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = props.updatedAt || new Date();
  }

  getRideId() {
    return this.id;
  }
  getRiderId() {
    return this.userId;
  }
  getPickup() {
    return this.pickup;
  }
  getDestination() {
    return this.destination;
  }
  getPickupAddress() {
    return this.pickupAddress;
  }
  getDestinationAddress() {
    return this.destinationAddress;
  }
  getVehicleType() {
    return this.vehicleType;
  }
  getVehicleModel() {
    return this.vehicleModel;
  }
  getVehicleNumber() {
    return this.vehicleNumber;
  }
  getHasHelmet() {
    return this.hasHelmet;
  }
  getSeatsAvailable() {
    return this.seatsAvailable;
  }
  getCostSharing() {
    return this.costSharing;
  }
  getTotalDistance() {
    return this.totalDistance;
  }
  getStatus() {
    return this.status;
  }
  getHikersMatched() {
    return this.hikersMatched;
  }

  updateStatus(newStatus: RideStatus) {
    this.status = newStatus;
    this.updatedAt = new Date();
  }

  addMatchedHiker(hikerId: string) {
    if (!this.hikersMatched.includes(hikerId)) {
      this.hikersMatched.push(hikerId);
    }
  }

  updateDistance(newDistance: number) {
    this.totalDistance = newDistance;
    this.updatedAt = new Date();
  }

  updateSeats(count: number) {
    this.seatsAvailable = count;
    this.updatedAt = new Date();
  }
}
