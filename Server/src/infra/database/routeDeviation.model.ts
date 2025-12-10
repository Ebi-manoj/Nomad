import { Schema, model, Types } from 'mongoose';

export interface IRouteDeviationModel {
  _id: string;
  rideId: Types.ObjectId;
  hikeId: Types.ObjectId;
  riderId: Types.ObjectId;
  hikerId: Types.ObjectId;
  currentLocation: GeoJSON.Point;
  deviationDistance: number;
  acknowledged: boolean;
  detectedAt: Date;
  acknowledgedAt?: Date | null;
  sosTriggeredAt?: Date | null;
}

const RouteDeviationSchema = new Schema<IRouteDeviationModel>({
  rideId: {
    type: Schema.Types.ObjectId,
    ref: 'RideLog',
    required: true,
    index: true,
  },
  hikeId: {
    type: Schema.Types.ObjectId,
    ref: 'HikeLog',
    required: true,
  },
  riderId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  hikerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  currentLocation: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], required: true },
  },
  deviationDistance: {
    type: Number,
    required: true,
  },
  acknowledged: {
    type: Boolean,
    default: false,
    index: true,
  },
  detectedAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
  acknowledgedAt: {
    type: Date,
    default: null,
  },
  sosTriggeredAt: {
    type: Date,
    default: null,
  },
});

RouteDeviationSchema.index({ currentLocation: '2dsphere' });

export const RouteDeviationModel = model<IRouteDeviationModel>(
  'RouteDeviation',
  RouteDeviationSchema
);
