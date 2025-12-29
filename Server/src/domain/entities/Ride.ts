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
  completedAt?: Date;
  route: GeoJSON.LineString;
  totalEarning?: number;
  platformFee?: number;
  safetyScore?: number;
}

export class RideLog {
  private readonly _id?: string;
  private _userId: string;
  private _pickup: GeoJSON.Point;
  private _destination: GeoJSON.Point;
  private _pickupAddress: string;
  private _destinationAddress: string;
  private _totalDistance: number;
  private _vehicleType: VehicleType;
  private _vehicleModel: string;
  private _vehicleNumber: string;
  private _hasHelmet: boolean;
  private _seatsAvailable: number;
  private _costSharing: number;
  private _hikersMatched: string[];
  private _status: RideStatus;
  private readonly _createdAt: Date;
  private _updatedAt: Date;
  private _completedAt?: Date;
  private _route: GeoJSON.LineString;
  private _totalEarning?: number;
  private _platformFee?: number;
  private _safetyScore?: number;

  constructor(props: RideProps) {
    this._id = props.id;
    this._userId = props.userId;
    this._pickup = props.pickup;
    this._destination = props.destination;
    this._pickupAddress = props.pickupAddress;
    this._destinationAddress = props.destinationAddress;
    this._totalDistance = props.totalDistance;
    this._vehicleType = props.vehicleType;
    this._vehicleModel = props.vehicleModel;
    this._vehicleNumber = props.vehicleNumber;
    this._hasHelmet = props.hasHelmet;
    this._seatsAvailable = props.seatsAvailable;
    this._costSharing = props.costSharing;
    this._hikersMatched = props.hikersMatched || [];
    this._status = props.status || 'ACTIVE';
    this._createdAt = props.createdAt || new Date();
    this._updatedAt = props.updatedAt || new Date();
    this._completedAt = props.completedAt;
    this._route = props.route;
    this._totalEarning = props.totalEarning;
    this._platformFee = props.platformFee;
    this._safetyScore = props.safetyScore;
  }

  getRideId() {
    return this._id;
  }
  getRiderId() {
    return this._userId;
  }
  getPickup() {
    return this._pickup;
  }
  getDestination() {
    return this._destination;
  }
  getPickupAddress() {
    return this._pickupAddress;
  }
  getDestinationAddress() {
    return this._destinationAddress;
  }
  getVehicleType() {
    return this._vehicleType;
  }
  getVehicleModel() {
    return this._vehicleModel;
  }
  getVehicleNumber() {
    return this._vehicleNumber;
  }
  getHasHelmet() {
    return this._hasHelmet;
  }
  getSeatsAvailable() {
    return this._seatsAvailable;
  }
  getCostSharing() {
    return this._costSharing;
  }
  getTotalDistance() {
    return this._totalDistance;
  }
  getStatus() {
    return this._status;
  }
  getHikersMatched() {
    return this._hikersMatched;
  }
  getCreatedAt() {
    return this._createdAt;
  }
  getCompletedAt() {
    return this._completedAt;
  }
  getTotalEarning() {
    return this._totalEarning ?? 0;
  }
  getPlatformFeeTotal() {
    return this._platformFee ?? 0;
  }
  getSafetyScore() {
    return this._safetyScore;
  }
  updateStatus(newStatus: RideStatus) {
    this._status = newStatus;
    this._updatedAt = new Date();
  }

  addMatchedHiker(hikeId: string) {
    if (!this._hikersMatched.includes(hikeId)) {
      this._hikersMatched.push(hikeId);
    }
  }

  updateDistance(newDistance: number) {
    this._totalDistance = newDistance;
    this._updatedAt = new Date();
  }

  updateSeats(count: number) {
    this._seatsAvailable = count;
    this._updatedAt = new Date();
  }
  getRoute() {
    return this._route;
  }

  setRoute(route: GeoJSON.LineString) {
    this._route = route;
    this._updatedAt = new Date();
  }
  reserveSeats(count: number) {
    if (this._seatsAvailable < count) throw new SeatsNotAvailable();
    this._seatsAvailable -= count;
  }
  releaseSeats(count: number) {
    this._seatsAvailable += count;
  }
  setEarnings(totalEarning: number, platformFee: number) {
    this._totalEarning = Number(totalEarning.toFixed(2));
    this._platformFee = Number(platformFee.toFixed(2));
    this._updatedAt = new Date();
  }
  setSafetyScore(score: number) {
    this._safetyScore = Math.max(0, Math.min(100, Math.round(score)));
    this._updatedAt = new Date();
  }
  complete() {
    this._status = RideStatus.COMPLETED;
    this._updatedAt = new Date();
    this._completedAt = new Date();
  }
}
