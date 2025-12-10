import { Types } from 'mongoose';
import { RouteDeviation } from '../../domain/entities/RouteDeviation';
import { IRouteDeviationModel } from '../database/routeDeviation.model';
import { IMapper } from './IMapper';

export const routeDeviationMapper: IMapper<RouteDeviation, IRouteDeviationModel> = {
  toDomain(doc: IRouteDeviationModel): RouteDeviation {
    return new RouteDeviation({
      id: doc._id?.toString(),
      rideId: doc.rideId.toString(),
      riderId: doc.riderId.toString(),
      hikerId: doc.hikerId.toString(),
      currentLocation: doc.currentLocation,
      deviationDistance: doc.deviationDistance,
      acknowledged: doc.acknowledged,
      detectedAt: doc.detectedAt,
      acknowledgedAt: doc.acknowledgedAt ?? undefined,
      sosTriggeredAt: doc.sosTriggeredAt ?? undefined,
    });
  },

  toPersistence(domain: RouteDeviation): Partial<IRouteDeviationModel> {
    return {
      rideId: new Types.ObjectId(domain.getRideId()),
      riderId: new Types.ObjectId(domain.getRiderId()),
      hikerId: new Types.ObjectId(domain.getHikerId()),
      currentLocation: domain.getCurrentLocation(),
      deviationDistance: domain.getDeviationDistance(),
      acknowledged: domain.getAcknowledged(),
      detectedAt: domain.getDetectedAt(),
      acknowledgedAt: domain.getAcknowledgedAt(),
      sosTriggeredAt: domain.getSosTriggeredAt(),
    };
  },
};
