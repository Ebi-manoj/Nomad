import { TaskType, TaskStatus } from '../enums/Task';

export interface TaskProps {
  id?: string;
  rideId: string;
  rideBookingId: string;
  riderId: string;
  hikerId: string;
  taskType: TaskType;
  location: GeoJSON.Point;
  address: string;
  priority: number;
  otp?: string;
  status: TaskStatus;
  completedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Task {
  private _id?: string;
  private _rideId: string;
  private _rideBookingId: string;
  private _riderId: string;
  private _hikerId: string;
  private _taskType: TaskType;
  private _location: GeoJSON.Point;
  private _address: string;
  private _priority: number;
  private _otp?: string;
  private _status: TaskStatus;
  private _completedAt?: Date;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: TaskProps) {
    this._id = props.id;
    this._rideId = props.rideId;
    this._rideBookingId = props.rideBookingId;
    this._riderId = props.riderId;
    this._hikerId = props.hikerId;
    this._taskType = props.taskType;
    this._location = props.location;
    this._address = props.address;
    this._priority = props.priority;
    this._otp = props.otp;
    this._status = props.status;
    this._completedAt = props.completedAt;
    this._createdAt = props.createdAt || new Date();
    this._updatedAt = props.updatedAt || new Date();
  }

  // Getters
  getId(): string | undefined {
    return this._id;
  }

  getRideId(): string {
    return this._rideId;
  }

  getRideBookingId(): string {
    return this._rideBookingId;
  }

  getRiderId(): string {
    return this._riderId;
  }

  getHikerId(): string {
    return this._hikerId;
  }

  getTaskType(): TaskType {
    return this._taskType;
  }

  getLocation(): GeoJSON.Point {
    return this._location;
  }

  getAddress(): string {
    return this._address;
  }

  getPriority(): number {
    return this._priority;
  }

  getOtp(): string | undefined {
    return this._otp;
  }

  getStatus(): TaskStatus {
    return this._status;
  }

  getCompletedAt(): Date | undefined {
    return this._completedAt;
  }

  getCreatedAt(): Date {
    return this._createdAt;
  }

  getUpdatedAt(): Date {
    return this._updatedAt;
  }

  // Setters
  setOtp(otp: string) {
    this._otp = otp;
    this._updatedAt = new Date();
  }

  start() {
    this._status = TaskStatus.IN_PROGRESS;
    this._updatedAt = new Date();
  }

  complete() {
    this._status = TaskStatus.COMPLETED;
    this._completedAt = new Date();
    this._updatedAt = new Date();
  }

  cancel() {
    this._status = TaskStatus.CANCELLED;
    this._updatedAt = new Date();
  }

  setPriority(priority: number) {
    this._priority = priority;
    this._updatedAt = new Date();
  }
}
