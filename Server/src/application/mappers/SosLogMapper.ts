import { SosLog } from '../../domain/entities/SosLog';
import { SosLogResDTO } from '../../domain/dto/SosDTO';

export function sosLogMapper(sosLog: SosLog): SosLogResDTO {
  const [lng, lat] = sosLog.getLocation().coordinates;

  return {
    id: sosLog.getId()!,
    userId: sosLog.getUserId(),
    bookingId: sosLog.getBookingId() || null,
    rideId: sosLog.getRideId() || null,
    location: { lat, lng },
    initiatedBy: sosLog.getInitiatedBy(),
    status: sosLog.getStatus(),
    triggeredAt: sosLog.getCreatedAt(),
  };
}
