import { RideMatchDTO } from '../../../../domain/dto/RideMatch';
import { IRideRepository } from '../../../repositories/IRideRepository';

export class FindMatchRideUseCase {
  constructor(private readonly rideRepository: IRideRepository) {}

  async execute(data: RideMatchDTO) {
    const activeRiders = await this.rideRepository.findActiveNearbyRiders(
      data.pickup
    );
    console.log(activeRiders);
  }
}
