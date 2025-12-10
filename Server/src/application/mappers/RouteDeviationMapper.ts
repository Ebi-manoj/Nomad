import { RouteDeviationResDTO } from '../../domain/dto/RouteDeviationDTO';
import { RouteDeviation } from '../../domain/entities/RouteDeviation';

export function RouteDeviationMapper(
  doc: RouteDeviation
): RouteDeviationResDTO {
  return {
    id: doc.getId()!,
    rideId: doc.getRideId(),
    hikeId: doc.getHikeId(),
    riderId: doc.getRiderId(),
    hikerId: doc.getHikerId(),
    acknowledged: doc.getAcknowledged(),
    sosTriggeredAt: doc.getSosTriggeredAt(),
    deviationDistance: doc.getDeviationDistance(),
    detectedAt: doc.getDetectedAt(),
    currentLocation: doc.getCurrentLocation(),
  };
}
