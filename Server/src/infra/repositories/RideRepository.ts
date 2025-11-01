import { IRideRepository } from '../../application/repositories/IRideRepository';
import { RideLog } from '../../domain/entities/Ride';
import { IRideLog, RideLogModel } from '../database/ridelog.mode';
import { rideMapper } from '../mappers/rideDomainMapper';
import { MongoBaseRepository } from './BaseRepository';

export class RideRepository
  extends MongoBaseRepository<RideLog, IRideLog>
  implements IRideRepository
{
  constructor() {
    super(RideLogModel, rideMapper);
  }

  async findActiveNearbyRiders(pickup: GeoJSON.Point): Promise<RideLog[]> {
    const riders = await RideLogModel.aggregate([
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [pickup.coordinates[1], pickup.coordinates[0]],
          },
          distanceField: 'distanceToPickup',
          maxDistance: 5 * 1000,
          query: { status: 'active' },
          spherical: true,
          key: 'route',
        },
      },
    ]);

    return riders.map(ride => this.mapper.toDomain(ride));
  }
  async findUserActiveRide(userId: string): Promise<RideLog | null> {
    const ride = await this.model.findOne({ userId, status: 'active' });
    if (!ride) return null;
    return this.mapper.toDomain(ride);
  }
}
