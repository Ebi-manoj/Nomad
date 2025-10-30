import { JoinRequestResponseDTO } from '../../domain/dto/HikeDTO';
import { HikeLog } from '../../domain/entities/Hike';
import { JoinRequest } from '../../domain/entities/JoinRequests';
import { User } from '../../domain/entities/User';

export function joinRequestMapper(
  joinRequest: JoinRequest,
  hike: HikeLog,
  user: User
): JoinRequestResponseDTO {
  return {
    id: joinRequest.getId()!,
    rideId: joinRequest.getRideId(),
    status: joinRequest.getStatus(),
    seatsRequested: hike.getSeatsRequested(),
    pickupLocation: joinRequest.getPickupLocation(),
    dropoffLocation: joinRequest.getDropoffLocation(),
    hikerPickupAddress: hike.getPickupAddress(),
    hikerDestinationAddress: hike.getDestinationAddress(),
    totalDistance: hike.getTotalDistance(),
    costSharing: joinRequest.getCostSharing(),
    createdAt: joinRequest.getCreatedAt(),
    updatedAt: joinRequest.getUpdatedAt(),
    hiker: {
      id: user.getId()!,
      fullName: user.getFullName(),
      profilePicture: '',
      rating: 4.8,
    },
  };
}
