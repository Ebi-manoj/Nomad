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
  private id?: string;
  private rideId: string;
  private rideBookingId: string;
  private riderId: string;
  private hikerId: string;
  private taskType: TaskType;
  private location: GeoJSON.Point;
  private address: string;
  private priority: number;
  private otp?: string;
  private status: TaskStatus;
  private completedAt?: Date;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(props: TaskProps) {
    this.id = props.id;
    this.rideId = props.rideId;
    this.rideBookingId = props.rideBookingId;
    this.riderId = props.riderId;
    this.hikerId = props.hikerId;
    this.taskType = props.taskType;
    this.location = props.location;
    this.address = props.address;
    this.priority = props.priority;
    this.otp = props.otp;
    this.status = props.status;
    this.completedAt = props.completedAt;
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = props.updatedAt || new Date();
  }

  // Getters
  getId(): string | undefined {
    return this.id;
  }

  getRideId(): string {
    return this.rideId;
  }

  getRideBookingId(): string {
    return this.rideBookingId;
  }

  getRiderId(): string {
    return this.riderId;
  }

  getHikerId(): string {
    return this.hikerId;
  }

  getTaskType(): TaskType {
    return this.taskType;
  }

  getLocation(): GeoJSON.Point {
    return this.location;
  }

  getAddress(): string {
    return this.address;
  }

  getPriority(): number {
    return this.priority;
  }

  getOtp(): string | undefined {
    return this.otp;
  }

  getStatus(): TaskStatus {
    return this.status;
  }

  getCompletedAt(): Date | undefined {
    return this.completedAt;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  // Setters
  setOtp(otp: string) {
    this.otp = otp;
    this.updatedAt = new Date();
  }

  start() {
    this.status = TaskStatus.IN_PROGRESS;
    this.updatedAt = new Date();
  }

  complete() {
    this.status = TaskStatus.COMPLETED;
    this.completedAt = new Date();
    this.updatedAt = new Date();
  }

  cancel() {
    this.status = TaskStatus.CANCELLED;
    this.updatedAt = new Date();
  }

  setPriority(priority: number) {
    this.priority = priority;
    this.updatedAt = new Date();
  }
}
