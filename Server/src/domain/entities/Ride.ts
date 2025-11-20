import { RideStatus, VehicleType } from '../enums/Ride';
import { SeatsNotAvailable } from '../errors/HikeErrors';

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
  route: GeoJSON.LineString;
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
  private route: GeoJSON.LineString;

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
    this.route = props.route;
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

  addMatchedHiker(hikeId: string) {
    if (!this.hikersMatched.includes(hikeId)) {
      this.hikersMatched.push(hikeId);
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
  getRoute() {
    return this.route;
  }

  setRoute(route: GeoJSON.LineString) {
    this.route = route;
    this.updatedAt = new Date();
  }
  reserveSeats(count: number) {
    if (this.seatsAvailable < count) throw new SeatsNotAvailable();
    this.seatsAvailable -= count;
  }
  releaseSeats(count: number) {
    this.seatsAvailable += count;
  }
  complete() {
    this.status = RideStatus.COMPLETED;
    this.updatedAt = new Date();
  }
}
