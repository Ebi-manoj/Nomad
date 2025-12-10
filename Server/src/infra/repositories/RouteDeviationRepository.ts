import { MongoBaseRepository } from './BaseRepository';
import { IRouteDeviationRepository } from '../../application/repositories/IRouteDeviationRepository';
import { RouteDeviation } from '../../domain/entities/RouteDeviation';
import { IRouteDeviationModel, RouteDeviationModel } from '../database/routeDeviation.model';
import { routeDeviationMapper } from '../mappers/routeDeviationMapper';

export class RouteDeviationRepository
  extends MongoBaseRepository<RouteDeviation, IRouteDeviationModel>
  implements IRouteDeviationRepository
{
  constructor() {
    super(RouteDeviationModel, routeDeviationMapper);
  }

  async findByRideId(rideId: string): Promise<RouteDeviation[]> {
    const docs = await this.model
      .find({ rideId })
      .sort({ detectedAt: -1 });
    return docs.map(d => this.mapper.toDomain(d));
  }
}
