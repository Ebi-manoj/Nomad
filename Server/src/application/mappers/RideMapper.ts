import { RideResponseDTO } from '../../domain/dto/RideDTO';
import { RideLog } from '../../domain/entities/Ride';

export function rideMapper(ride: RideLog): RideResponseDTO {
  return {
    id: ride.getRideId()!,
    userId: ride.getRiderId(),
    pickup: ride.getPickup(),
    destination: ride.getDestination(),
    pickupAddress: ride.getPickupAddress(),
    destinationAddress: ride.getDestinationAddress(),
    totalDistance: ride.getTotalDistance(),
    vehicleType: ride.getVehicleType(),
    vehicleModel: ride.getVehicleModel(),
    vehicleNumber: ride.getVehicleNumber(),
    hasHelmet: ride.getHasHelmet(),
    seatsAvailable: ride.getSeatsAvailable(),
    costSharing: ride.getCostSharing(),
    status: ride.getStatus(),
    createdAt: ride.getCreatedAt(),
  };
}
