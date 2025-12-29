import { Types } from 'mongoose';
import { RideLog } from '../../domain/entities/Ride';
import { IMapper } from './IMapper';
import { IRideLog } from '../database/ridelog.mode';

export const rideMapper: IMapper<RideLog, IRideLog> = {
  toPersistence(
    domain: RideLog
  ): Omit<IRideLog, '_id' | 'createdAt' | 'updatedAt'> {
    return {
      userId: new Types.ObjectId(domain.getRiderId()),
      pickup: domain.getPickup(),
      destination: domain.getDestination(),
      route: domain.getRoute(),
      pickupAddress: domain.getPickupAddress(),
      destinationAddress: domain.getDestinationAddress(),
      totalDistance: domain.getTotalDistance(),
      vehicleType: domain.getVehicleType(),
      vehicleModel: domain.getVehicleModel(),
      vehicleNumber: domain.getVehicleNumber(),
      hasHelmet: domain.getHasHelmet(),
      seatsAvailable: domain.getSeatsAvailable(),
      costSharing: domain.getCostSharing(),
      completedAt: domain.getCompletedAt(),
      hikersMatched: domain
        .getHikersMatched()
        .map(id => new Types.ObjectId(id)),
      status: domain.getStatus(),
      totalEarning: domain.getTotalEarning(),
      platformFee: domain.getPlatformFeeTotal(),
      safetyScore: domain.getSafetyScore(),
    };
  },

  toDomain(persistence: IRideLog): RideLog {
    return new RideLog({
      id: persistence._id?.toString(),
      userId: persistence.userId.toString(),
      pickup: persistence.pickup,
      destination: persistence.destination,
      route: persistence.route,
      pickupAddress: persistence.pickupAddress,
      destinationAddress: persistence.destinationAddress,
      totalDistance: persistence.totalDistance,
      vehicleType: persistence.vehicleType,
      vehicleModel: persistence.vehicleModel,
      vehicleNumber: persistence.vehicleNumber,
      hasHelmet: persistence.hasHelmet,
      seatsAvailable: persistence.seatsAvailable,
      costSharing: persistence.costSharing,
      hikersMatched: persistence.hikersMatched.map(id => id.toString()),
      status: persistence.status,
      completedAt: persistence.completedAt,
      createdAt: persistence.createdAt,
      updatedAt: persistence.updatedAt,
      totalEarning: persistence.totalEarning,
      platformFee: persistence.platformFee,
      safetyScore: persistence.safetyScore,
    });
  },
};
