import { ActiveSession } from '../../../domain/dto/authDTO';
import { IHikeRepository } from '../../repositories/IHikeRepository';
import { IRideRepository } from '../../repositories/IRideRepository';
import { IActiveSessionsUseCase } from './IActiveSessionsUseCase';

export class ActiveSessionsUseCase implements IActiveSessionsUseCase {
  constructor(
    private readonly hikeRepository: IHikeRepository,
    private readonly rideRepository: IRideRepository
  ) {}

  async execute(userId: string): Promise<ActiveSession> {
    const activeHike = await this.hikeRepository.findUserActiveHike(userId);
    const activeRide = await this.rideRepository.findUserActiveRide(userId);

    return { activeRide, activeHike };
  }
}
