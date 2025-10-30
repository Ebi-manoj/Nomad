import { Types } from 'mongoose';
import { IJoinRequest } from '../database/joinRequest.model';
import { IMapper } from './IMapper';
import { JoinRequest } from '../../domain/entities/JoinRequests';

export const joinRequestMapper: IMapper<JoinRequest, IJoinRequest> = {
  toPersistence(domain: JoinRequest): Partial<IJoinRequest> {
    return {
      rideId: new Types.ObjectId(domain.getRideId()),
      hikeId: new Types.ObjectId(domain.getHikeId()),
      pickupLocation: domain.getPickupLocation(),
      dropoffLocation: domain.getDropoffLocation(),
      status: domain.getStatus(),
      createdAt: domain.getCreatedAt(),
    };
  },

  toDomain(persistence: IJoinRequest): JoinRequest {
    return new JoinRequest({
      id: persistence._id?.toString(),
      rideId: persistence.rideId.toString(),
      hikeId: persistence.hikeId.toString(),
      pickupLocation: persistence.pickupLocation,
      dropoffLocation: persistence.dropoffLocation,
      status: persistence.status,
      createdAt: persistence.createdAt,
    });
  },
};
