import { RouteDeviation } from '../../domain/entities/RouteDeviation';
import { IBaseRepository } from './IBaseRepository';

export interface IRouteDeviationRepository
  extends IBaseRepository<RouteDeviation> {
  findByRideId(rideId: string): Promise<RouteDeviation[]>;
  findByHikeIdLesserThan(
    minutes: number,
    hikeId: string
  ): Promise<RouteDeviation | null>;
}
