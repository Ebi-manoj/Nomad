import { Schema, model, Types } from 'mongoose';
import { JoinRequestStatus } from '../../domain/enums/Ride';

export interface IJoinRequest {
  _id: string;
  rideId: Types.ObjectId;
  hikeId: Types.ObjectId;
  pickupLocation: GeoJSON.Point;
  dropoffLocation: GeoJSON.Point;
  costSharing: number;
  status: JoinRequestStatus;
  createdAt: Date;
}

const JoinRequestSchema = new Schema<IJoinRequest>({
  rideId: {
    type: Schema.Types.ObjectId,
    ref: 'Ride',
    required: true,
  },
  hikeId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  pickupLocation: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], required: true },
  },
  dropoffLocation: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], required: true },
  },
  costSharing: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(JoinRequestStatus),
    default: JoinRequestStatus.PENDING,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300,
  },
});

export const JoinRequestModel = model<IJoinRequest>(
  'JoinRequest',
  JoinRequestSchema
);
