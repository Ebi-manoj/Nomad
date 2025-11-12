import mongoose, { Schema, Document } from 'mongoose';
import { TaskStatus, TaskType } from '../../domain/enums/Task';

export interface ITaskDocument extends Document {
  rideId: mongoose.Types.ObjectId;
  rideBookingId: mongoose.Types.ObjectId;
  riderId: mongoose.Types.ObjectId;
  hikerId: mongoose.Types.ObjectId;
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

const TaskSchema = new Schema<ITaskDocument>(
  {
    rideId: {
      type: Schema.Types.ObjectId,
      ref: 'RideLog',
      required: true,
      index: true,
    },
    rideBookingId: {
      type: Schema.Types.ObjectId,
      ref: 'RideBooking',
      required: true,
      index: true,
    },
    riderId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    hikerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    taskType: {
      type: String,
      enum: Object.values(TaskType),
      required: true,
      index: true,
    },
    location: {
      type: { type: String, default: 'Point' },
      coordinates: { type: [Number], required: true },
    },
    address: {
      type: String,
      required: true,
    },
    priority: {
      type: Number,
      required: true,
      default: 0,
      index: true,
    },
    otp: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: Object.values(TaskStatus),
      default: TaskStatus.PENDING,
      index: true,
    },
    completedAt: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);

TaskSchema.index({ riderId: 1, rideId: 1, status: 1 });
TaskSchema.index({ rideBookingId: 1, taskType: 1 }, { unique: true });

export const TaskModel = mongoose.model<ITaskDocument>('Task', TaskSchema);
