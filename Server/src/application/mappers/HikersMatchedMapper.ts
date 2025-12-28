import { GetHikersMatchedResponseDTO } from '../../domain/dto/RideDTO';
import { HikeLog } from '../../domain/entities/Hike';
import { RideBooking } from '../../domain/entities/RideBooking';
import { User } from '../../domain/entities/User';

export function hikersMatchedMapper(
  user: User,
  hike: HikeLog,
  booking: RideBooking,
  subscriptionTier: string,
  badgeColor: string
): GetHikersMatchedResponseDTO {
  return {
    user: {
      fullName: user.getFullName(),
      subscriptionTier,
      badgeColor,
      rating: 4.5,
      profilePic: '',
      isVerified: user.getIsVerifed(),
    },
    hikeDetails: {
      hikeId: booking.getHikeId(),
      pickupAddress: hike.getPickupAddress(),
      destinationAdress: hike.getDestinationAddress(),
      pickupLocation: {
        lat: booking.getPickupLocation().coordinates[1],
        lng: booking.getPickupLocation().coordinates[0],
      },
      dropoffLocation: {
        lat: booking.getDropoffLocation().coordinates[1],
        lng: booking.getDropoffLocation().coordinates[0],
      },
      costShared: booking.getCostShared(),
      totalDistance: hike.getTotalDistance(),
      seatsRequested: booking.getSeatsBooked(),
      status: booking.getStatus(),
    },
  };
}
