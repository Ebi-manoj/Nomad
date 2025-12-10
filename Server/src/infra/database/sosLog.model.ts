import { Schema, model, Types } from 'mongoose';
import { SosLogStatus } from '../../domain/enums/SosLogStatus';
import { SosInitiator } from '../../domain/enums/SosInitiator';

export interface ISosLogModel {
  _id: string;
  userId: Types.ObjectId;
  bookingId?: Types.ObjectId;
  rideId: Types.ObjectId;
  location: GeoJSON.Point;
  initiatedBy: SosInitiator;
  status: SosLogStatus;
  createdAt: Date;
  updatedAt: Date;
}

const SosLogSchema = new Schema<ISosLogModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    bookingId: {
      type: Schema.Types.ObjectId,
      ref: 'RideBooking',
      index: true,
      default: null,
    },
    rideId: {
      type: Schema.Types.ObjectId,
      ref: 'RideLog',
      index: true,
      default: null,
    },
    location: {
      type: { type: String, default: 'Point' },
      coordinates: { type: [Number], required: true },
    },
    initiatedBy: {
      type: String,
      enum: Object.values(SosInitiator),
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: Object.values(SosLogStatus),
      default: SosLogStatus.OPEN,
      index: true,
    },
  },
  { timestamps: true }
);

SosLogSchema.index({ location: '2dsphere' });

export const SosLogModel = model<ISosLogModel>('SosLog', SosLogSchema);
