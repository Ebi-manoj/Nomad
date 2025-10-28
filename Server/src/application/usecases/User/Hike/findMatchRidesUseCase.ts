import { IRideRepository } from '../../../repositories/IRideRepository';

export class FindMatchRideUseCase {
  constructor(private readonly rideRepository: IRideRepository) {}

  async execute() {}
}
