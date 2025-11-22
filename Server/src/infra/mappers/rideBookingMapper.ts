import { Types } from 'mongoose';
import { RideBooking } from '../../domain/entities/RideBooking';
import { IMapper } from '../mappers/IMapper';
import { IRideBookingDocument } from '../database/RideBooking.model';

export const rideBookingMapper: IMapper<RideBooking, IRideBookingDocument> = {
  toPersistence(domain: RideBooking): Partial<IRideBookingDocument> {
    return {
      rideId: new Types.ObjectId(domain.getRideId()),
      hikerId: new Types.ObjectId(domain.getHikerId()),
      riderId: new Types.ObjectId(domain.getRiderId()),
      hikeId: new Types.ObjectId(domain.getHikeId()),
      joinRequestId: new Types.ObjectId(domain.getJoinRequestId()),
      paymentId: new Types.ObjectId(domain.getPaymentId()),
      seatsBooked: domain.getSeatsBooked(),
      amount: domain.getAmount(),
      platformFee: domain.getPlatformFee(),
      pickupLocation: domain.getPickupLocation(),
      dropoffLocation: domain.getDropoffLocation(),
      completedAt: domain.getCompletedAt(),
      status: domain.getStatus(),
      refundedAmount: domain.getRefundedAmount(),
      cancelledAt: domain.getCancelledAt(),
    };
  },

  toDomain(persistence: IRideBookingDocument): RideBooking {
    return new RideBooking({
      id: persistence._id?.toString(),
      rideId: persistence.rideId.toString(),
      hikerId: persistence.hikerId.toString(),
      riderId: persistence.riderId.toString(),
      hikeId: persistence.hikeId.toString(),
      joinRequestId: persistence.joinRequestId.toString(),
      paymentId: persistence.paymentId.toString(),
      seatsBooked: persistence.seatsBooked,
      amount: persistence.amount,
      platformFee: persistence.platformFee,
      pickupLocation: persistence.pickupLocation,
      dropoffLocation: persistence.dropoffLocation,
      status: persistence.status,
      completedAt: persistence.completedAt,
      createdAt: persistence.createdAt,
      updatedAt: persistence.updatedAt,
      refundedAmount: persistence.refundedAmount,
      cancelledAt: persistence.cancelledAt || undefined,
    });
  },
};
