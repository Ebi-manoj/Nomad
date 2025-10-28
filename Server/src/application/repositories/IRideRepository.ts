import { RideLog } from '../../domain/entities/Ride';
import { IBaseRepository } from './IBaseRepository';

export interface IRideRepository extends IBaseRepository<RideLog> {
  findActiveNearbyRiders(pickup: GeoJSON.Point): Promise<RideLog[]>;
}
