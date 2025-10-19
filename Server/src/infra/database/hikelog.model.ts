import { Schema, model, Types } from 'mongoose';
import { HikeStatus } from '../../domain/enums/Hike';

export interface IHikeLog {
  _id: string;
  userId: Types.ObjectId;
  pickup: GeoJSON.Point;
  destination: GeoJSON.Point;
  pickupAddress: string;
  destinationAddress: string;
  totalDistance: number;
  hasHelmet: boolean;
  seatsRequested: number;
  riderId?: string | null;
  status: HikeStatus;
  confirmed: boolean;
  createdAt: Date;
}

const HikeLogSchema = new Schema<IHikeLog>({
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
  hasHelmet: {
    type: Boolean,
    required: true,
  },
  seatsRequested: {
    type: Number,
    required: true,
  },
  riderId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  status: {
    type: String,
    enum: Object.values(HikeStatus),
    default: HikeStatus.REQUESTED,
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

HikeLogSchema.index({ pickup: '2dsphere' });
HikeLogSchema.index({ destination: '2dsphere' });

export const HikeLogModel = model<IHikeLog>('HikeLog', HikeLogSchema);
