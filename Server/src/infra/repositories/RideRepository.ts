import { IRideRepository } from '../../application/repositories/IRideRepository';
import { RideLog } from '../../domain/entities/Ride';
import { RideNotFound } from '../../domain/errors/RideErrors';
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

  async findUserRides(
    userId: string,
    skip: number,
    status?: string
  ): Promise<RideLog[]> {
    const query: any = { userId };
    if (status && status !== 'all') {
      query.status = status;
    }

    const rides = await this.model
      .find(query)
      .skip(skip)
      .sort({ createdAt: -1 });

    return rides.map(ride => this.mapper.toDomain(ride));
  }

  async findCountUserRides(userId: string, status?: string): Promise<number> {
    const query: any = { userId };
    if (status && status !== 'all') {
      query.status = status;
    }

    return this.model.countDocuments(query);
  }

  async findAllRides(
    limit: number,
    skip: number,
    status?: string
  ): Promise<RideLog[]> {
    const query: any = {};
    if (status) {
      query.status = status;
    }

    const rides = await this.model
      .find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    return rides.map(ride => this.mapper.toDomain(ride));
  }

  async countRides(status?: string): Promise<number> {
    const query: any = {};
    if (status) {
      query.status = status;
    }

    return this.model.countDocuments(query);
  }

  async releaseSeats(rideId: string, seats: number): Promise<boolean> {
    const result = await this.model.updateOne(
      { _id: rideId },
      {
        $inc: { seatsAvailable: seats },
      }
    );
    return result.modifiedCount > 0;
  }

  async updateWithLock(
    rideId: string,
    callback: (ride: RideLog) => Promise<RideLog>
  ): Promise<RideLog> {
    const session = await this.model.startSession();
    session.startTransaction();

    try {
      const doc = await this.model.findById(rideId);
      if (!doc) throw new RideNotFound();

      const ride = this.mapper.toDomain(doc);
      const updated = await callback(ride);

      const rideData = this.mapper.toPersistence(updated);
      await this.model.findByIdAndUpdate(rideId, rideData, { session });

      await session.commitTransaction();
      return updated;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}
