import { UpdateLocationDTO } from '../../../../domain/dto/RideDTO';
import { Location } from '../../../../domain/entities/Location';
import { ILocationRepository } from '../../../repositories/ILocationRepository';

export class UpdateRiderLocationUseCase {
  constructor(private readonly locationRepository: ILocationRepository) {}

  async execute(data: UpdateLocationDTO) {
    const location = new Location(data);
    await this.locationRepository.saveLocation(location);
  }
}
