import {
  RideMatchDTO,
  RideMatchResponseDTO,
} from '../../../../domain/dto/RideMatch';
import { IGeoService } from '../../../providers/IGeoService';
import { IRideRepository } from '../../../repositories/IRideRepository';
import { RideMatchService } from '../../../services/RideMatchService';

export class FindMatchRideUseCase {
  constructor(
    private readonly rideRepository: IRideRepository,
    private readonly rideMatchService: RideMatchService,
    private readonly geoService: IGeoService
  ) {}

  async execute(data: RideMatchDTO): Promise<RideMatchResponseDTO[]> {
    const activeRiders = await this.rideRepository.findActiveNearbyRiders(
      data.pickup
    );
    console.log(activeRiders);
    const filtered = [];
    for (const ride of activeRiders) {
      const match = await this.rideMatchService.evaluate(
        ride,
        data,
        this.geoService
      );
      if (match) filtered.push(match);
    }
    console.log(filtered);

    return filtered;
  }
}
