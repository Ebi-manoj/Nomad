import mongoose, { Schema, Document } from 'mongoose';
import { RideBookingStatus } from '../../domain/enums/RideBooking';

export interface IRideBookingDocument extends Document {
  rideId: mongoose.Types.ObjectId;
  hikerId: mongoose.Types.ObjectId;
  riderId: mongoose.Types.ObjectId;
  hikeId: mongoose.Types.ObjectId;
  joinRequestId: mongoose.Types.ObjectId;
  paymentId: mongoose.Types.ObjectId;
  bookingNumber: string;
  seatsBooked: number;
  amount: number;
  platformFee: number;
  riderInitialLocation: GeoJSON.Point;
  pickupLocation: GeoJSON.Point;
  dropoffLocation: GeoJSON.Point;
  status: RideBookingStatus;
  completedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  refundedAmount: number;
  cancelledAt?: Date;
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
    bookingNumber: {
      type: String,
      required: true,
      index: true,
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
    riderInitialLocation: {
      type: { type: String, default: 'Point' },
      coordinates: { type: [Number], required: true },
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
    completedAt: {
      type: Date,
      default: null,
    },
    refundedAmount: {
      type: Number,
      required: true,
      default: 0,
    },
    cancelledAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

export const RideBookingModel = mongoose.model<IRideBookingDocument>(
  'RideBooking',
  RideBookingSchema
);
