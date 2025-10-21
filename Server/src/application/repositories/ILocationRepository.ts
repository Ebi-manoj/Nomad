import { Location } from '../../domain/entities/Location';

export interface ILocationRepository {
  saveLocation(location: Location): Promise<void>;
}
