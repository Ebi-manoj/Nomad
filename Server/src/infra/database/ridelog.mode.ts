import { Schema, model, Types } from 'mongoose';
import { RideStatus, VehicleType } from '../../domain/enums/Ride';

export interface IRideLog {
  _id: string;
  userId: Types.ObjectId;
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
  hikersMatched: Types.ObjectId[];
  status: RideStatus;
  createdAt: Date;
  updatedAt: Date;
}

const RideLogSchema = new Schema<IRideLog>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  pickup: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], required: true },
  },
  destination: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], required: true },
  },
  pickupAddress: {
    type: String,
    required: true,
  },
  destinationAddress: {
    type: String,
    required: true,
  },
  totalDistance: {
    type: Number,
    required: true,
  },
  vehicleType: {
    type: String,
    required: true,
    enum: ['bike', 'car'],
  },
  vehicleModel: {
    type: String,
    required: true,
  },
  vehicleNumber: {
    type: String,
    required: true,
  },
  hasHelmet: {
    type: Boolean,
    default: false,
  },
  seatsAvailable: {
    type: Number,
    default: 0,
  },
  costSharing: {
    type: Number,
    required: true,
  },
  hikersMatched: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  status: {
    type: String,
    enum: Object.values(RideStatus),
    default: RideStatus.ACTIVE,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

RideLogSchema.index({ pickup: '2dsphere' });
RideLogSchema.index({ destination: '2dsphere' });

export const RideLogModel = model<IRideLog>('RideLog', RideLogSchema);
