import { IHikeRepository } from '../../repositories/IHikeRepository';
import { IRideRepository } from '../../repositories/IRideRepository';

export class ActiveSessionsUseCase {
  constructor(
    private readonly hikeRepository: IHikeRepository,
    private readonly rideRepository: IRideRepository
  ) {}

  async execute(userId: string) {
    const activeHike = await this.hikeRepository.findUserActiveHike(userId);
    const activeRide = await this.rideRepository.findUserActiveRide(userId);

    return { activeHike, activeRide };
  }
}
