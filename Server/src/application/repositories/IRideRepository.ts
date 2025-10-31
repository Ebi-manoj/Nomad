import { RideLog } from '../../domain/entities/Ride';
import { IBaseRepository } from './IBaseRepository';

export interface IRideRepository extends IBaseRepository<RideLog> {
  findActiveNearbyRiders(pickup: GeoJSON.Point): Promise<RideLog[]>;
  findUserActiveRide(userId: string): Promise<RideLog | null>;
}
