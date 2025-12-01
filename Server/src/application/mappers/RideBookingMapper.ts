import { BookingResponseDTO } from '../../domain/dto/RideBookingDTO';
import { RideBooking } from '../../domain/entities/RideBooking';

export function RideBookingMapper(booking: RideBooking): BookingResponseDTO {
  return {
    bookingId: booking.getId()!,
    bookingNumber: booking.getBookingNumber(),
    rideId: booking.getRideId(),
    hikeId: booking.getHikeId(),
    riderId: booking.getRiderId(),
    hikerId: booking.getHikerId(),
    seatsBooked: booking.getSeatsBooked(),
    amount: booking.getAmount(),
    platformFee: booking.getPlatformFee(),
    status: booking.getStatus(),
    pickupLocation: booking.getPickupLocation().coordinates,
    dropoffLocation: booking.getDropoffLocation().coordinates,
    createdAt: booking.getCreatedAt(),
  };
}
