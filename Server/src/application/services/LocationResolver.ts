import { RideLocationNotFound } from '../../domain/errors/RideErrors';
import { ILocationRepository } from '../repositories/ILocationRepository';
import { ILocationResolver } from './ILocationResolver';

export class LocationResolver implements ILocationResolver {
  constructor(private readonly _locationRepository: ILocationRepository) {}

  async resolveLocation(
    providedLocation: { lat: number; lng: number } | undefined,
    rideId: string
  ): Promise<GeoJSON.Point> {
    if (providedLocation) {
      return {
        type: 'Point',
        coordinates: [providedLocation.lng, providedLocation.lat],
      };
    }

    const riderLocation = await this._locationRepository.getLocation(rideId);
    if (!riderLocation) {
      throw new RideLocationNotFound();
    }

    return {
      type: 'Point',
      coordinates: [riderLocation.lng, riderLocation.lat],
    };
  }
}
