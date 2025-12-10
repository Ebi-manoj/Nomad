import { RouteDeviation } from '../../domain/entities/RouteDeviation';
import { IBaseRepository } from './IBaseRepository';

export interface IRouteDeviationRepository extends IBaseRepository<RouteDeviation> {
  findByRideId(rideId: string): Promise<RouteDeviation[]>;
}
