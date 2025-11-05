import { UpdateLocationDTO } from '../../../../domain/dto/RideDTO';
import { Location } from '../../../../domain/entities/Location';
import { ILocationRepository } from '../../../repositories/ILocationRepository';
import { IUpdateLocationUseCase } from './IUpdateLocationUseCase';

export class UpdateLocationUseCase implements IUpdateLocationUseCase {
  constructor(private readonly locationRepository: ILocationRepository) {}

  async execute(data: UpdateLocationDTO) {
    const location = new Location(data);
    await this.locationRepository.saveLocation(location);
  }
}
