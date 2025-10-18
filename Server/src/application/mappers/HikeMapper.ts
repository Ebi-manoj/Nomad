import { HikeResponseDTO } from '../../domain/dto/HikeDTO';
import { HikeLog } from '../../domain/entities/Hike';

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
    confirmed: hike.getConfirmed(),
    createdAt: hike.getCreatedAt(),
  };
}
