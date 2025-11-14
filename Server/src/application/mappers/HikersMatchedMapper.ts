import { GetHikersMatchedResponseDTO } from '../../domain/dto/RideDTO';
import { HikeLog } from '../../domain/entities/Hike';
import { Location } from '../../domain/entities/Location';
import { RideBooking } from '../../domain/entities/RideBooking';
import { User } from '../../domain/entities/User';

export function hikersMatchedMapper(
  user: User,
  hike: HikeLog,
  booking: RideBooking,
  location: Location
): GetHikersMatchedResponseDTO {
  return {
    user: {
      fullName: user.getFullName(),
      rating: 4.5,
      profilePic: '',
      currentLocation: { lat: location.lat, lng: location.lng },
      isVerified: user.getIsVerifed(),
    },
    hikeDetails: {
      hikeId: booking.getHikeId(),
      pickupAddress: hike.getPickupAddress(),
      destinationAdress: hike.getDestinationAddress(),
      costShared: booking.getCostShared(),
      totalDistance: hike.getTotalDistance(),
      seatsRequested: booking.getSeatsBooked(),
      status: hike.getStatus(),
    },
  };
}
