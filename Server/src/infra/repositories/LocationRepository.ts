import { ILocationRepository } from '../../application/repositories/ILocationRepository';
import { Location } from '../../domain/entities/Location';
import { redisClient } from '../database/connectRedis';

export class LocationRepository implements ILocationRepository {
  private readonly client;
  constructor() {
    this.client = redisClient;
  }

  async saveLocation(location: Location): Promise<void> {
    const key = `rider:location:${location.rideId}`;
    const geoKey = 'riders:active';
    const data = location.toJSON();
    await this.client.hSet(key, data);

    await this.client.geoAdd(geoKey, {
      longitude: location.lng,
      latitude: location.lat,
      member: location.rideId,
    });

    console.log('updated');
  }
}
