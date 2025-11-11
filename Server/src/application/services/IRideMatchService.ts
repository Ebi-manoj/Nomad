import { RideMatchResponseDTO } from '../../domain/dto/RideMatch';
import { RideLog } from '../../domain/entities/Ride';
import { IGeoService } from '../providers/IGeoService';

export interface IRideMatchService {
  evaluate(
    ride: RideLog,
    context: { pickup: GeoJSON.Point; destination: GeoJSON.Point },
    geo: IGeoService
  ): Promise<Omit<RideMatchResponseDTO, 'requestStatus' | 'paymentId'> | null>;
}
