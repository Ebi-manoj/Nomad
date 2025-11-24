import { RideLog } from '../../domain/entities/Ride';
import { IBaseRepository } from './IBaseRepository';

export interface IRideRepository extends IBaseRepository<RideLog> {
  findActiveNearbyRiders(pickup: GeoJSON.Point): Promise<RideLog[]>;
  findUserActiveRide(userId: string): Promise<RideLog | null>;
  updateWithLock(
    rideId: string,
    callback: (ride: RideLog) => Promise<RideLog>
  ): Promise<RideLog>;

  releaseSeats(rideId: string, seats: number): Promise<boolean>;
  findUserRides(
    userId: string,
    skip: number,
    status?: string
  ): Promise<RideLog[]>;
  findCountUserRides(userId: string, status?: string): Promise<number>;
}
