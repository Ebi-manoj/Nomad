import mongoose, { Schema, Document } from 'mongoose';
import { RideBookingStatus } from '../../domain/enums/RideBooking';

export interface IRideBookingDocument extends Document {
  rideId: mongoose.Types.ObjectId;
  hikerId: mongoose.Types.ObjectId;
  riderId: mongoose.Types.ObjectId;
  hikeId: mongoose.Types.ObjectId;
  joinRequestId: mongoose.Types.ObjectId;
  paymentId: mongoose.Types.ObjectId;
  seatsBooked: number;
  amount: number;
  platformFee: number;
  pickupLocation: GeoJSON.Point;
  dropoffLocation: GeoJSON.Point;
  status: RideBookingStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

const RideBookingSchema = new Schema<IRideBookingDocument>(
  {
    rideId: {
      type: Schema.Types.ObjectId,
      ref: 'RideLog',
      required: true,
      index: true,
    },
    hikerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    riderId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    hikeId: {
      type: Schema.Types.ObjectId,
      ref: 'HikeLog',
      required: true,
      index: true,
    },
    joinRequestId: {
      type: Schema.Types.ObjectId,
      ref: 'JoinRequest',
      required: true,
      index: true,
    },
    paymentId: {
      type: Schema.Types.ObjectId,
      ref: 'Payment',
      required: true,
      unique: true,
    },
    seatsBooked: {
      type: Number,
      required: true,
      min: 1,
    },
    amount: {
      type: Number,
      required: true,
    },
    platformFee: {
      type: Number,
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
    status: {
      type: String,
      enum: Object.values(RideBookingStatus),
      default: RideBookingStatus.CONFIRMED,
      index: true,
    },
  },
  { timestamps: true }
);

export const RideBookingModel = mongoose.model<IRideBookingDocument>(
  'RideBooking',
  RideBookingSchema
);
