import { Types } from 'mongoose';
import { HikeLog } from '../../domain/entities/Hike';
import { IHikeLog } from '../database/hikelog.model';
import { IMapper } from './IMapper';

export const hikeMapper: IMapper<HikeLog, IHikeLog> = {
  toPersistence(domain: HikeLog): Partial<IHikeLog> {
    return {
      userId: new Types.ObjectId(domain.getUserId()),
      pickup: domain.getPickup(),
      destination: domain.getDestination(),
      pickupAddress: domain.getPickupAddress(),
      destinationAddress: domain.getDestinationAddress(),
      totalDistance: domain.getTotalDistance(),
      hasHelmet: domain.getHasHelmet(),
      seatsRequested: domain.getSeatsRequested(),
      riderId: domain.getRiderId() || null,
      status: domain.getStatus(),
      confirmed: domain.getConfirmed(),
    };
  },

  toDomain(persistence: IHikeLog): HikeLog {
    return new HikeLog({
      id: persistence._id?.toString(),
      userId: persistence.userId.toString(),
      pickup: persistence.pickup,
      destination: persistence.destination,
      pickupAddress: persistence.pickupAddress,
      destinationAddress: persistence.destinationAddress,
      totalDistance: persistence.totalDistance,
      hasHelmet: persistence.hasHelmet,
      seatsRequested: persistence.seatsRequested,
      riderId: persistence.riderId?.toString() || null,
      status: persistence.status,
      confirmed: persistence.confirmed,
      createdAt: persistence.createdAt,
    });
  },
};
