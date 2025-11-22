import { HikeResponseDTO } from '../../domain/dto/HikeDTO';
import { HikeLog } from '../../domain/entities/Hike';
import { Payment } from '../../domain/entities/Payment';
import { GetHikeDetailsResponseDTO } from '../../domain/dto/HikeDTO';
import { RideBooking } from '../../domain/entities/RideBooking';
import { User } from '../../domain/entities/User';

export function hikeMapper(hike: HikeLog): HikeResponseDTO {
  return {
    id: hike.getHikeId()!,
    userId: hike.getUserId(),
    pickup: hike.getPickup(),
    destination: hike.getDestination(),
    pickupAddress: hike.getPickupAddress(),
    destinationAddress: hike.getDestinationAddress(),
    totalDistance: hike.getTotalDistance(),
    status: hike.getStatus(),
    hasHelmet: hike.getHasHelmet(),
    seatsRequested: hike.getSeatsRequested(),
    estimatedPrice: hike.getEstimatedPrice(),
    riderId: hike.getRiderId() || null,
    bookingId: hike.getBookingId() || null,
    confirmed: hike.getConfirmed(),
    createdAt: hike.getCreatedAt(),
  };
}

export function HikeDetailsMapper(
  hike: HikeLog,
  payment: Payment | null,
  booking: RideBooking | null,
  user: User | null
): GetHikeDetailsResponseDTO {
  return {
    hikeId: hike.getHikeId()!,
    userId: hike.getUserId(),
    pickupAddress: hike.getPickupAddress(),
    destinationAddress: hike.getDestinationAddress(),
    totalDistance: hike.getTotalDistance(),
    hasHelmet: hike.getHasHelmet(),
    seatsRequested: hike.getSeatsRequested(),
    status: hike.getStatus(),
    confirmed: hike.getConfirmed(),
    createdAt: hike.getCreatedAt(),
    rider: !user
      ? null
      : {
          fullname: user.getFullName(),
          verified: user.getIsVerifed(),
          rating: 4.6,
          profilePic: '',
        },
    bookingDetails: !booking
      ? null
      : {
          bookingId: booking.getId()!,
          pickupLocation: booking.getPickupLocation().coordinates as [
            number,
            number
          ],
          dropOffLocation: booking.getDropoffLocation().coordinates as [
            number,
            number
          ],
          status: booking.getStatus(),
          createdAt: booking.getCreatedAt(),
          completedAt: booking.getCompletedAt(),
          cancelledAt: booking.getCancelledAt(),
          refundAmount: booking.getRefundedAmount(),
        },

    paymentDetails: !payment
      ? null
      : {
          paymentId: payment.getId()!,
          amount: payment.getAmount(),
          platFormFee: payment.getPlatformFee(),
          status: payment.getStatus(),
          createdAt: payment.getCreatedAt(),
        },
  };
}
