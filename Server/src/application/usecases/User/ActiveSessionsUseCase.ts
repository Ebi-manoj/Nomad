import { ActiveSession } from '../../../domain/dto/authDTO';
import { IHikeRepository } from '../../repositories/IHikeRepository';
import { IRideRepository } from '../../repositories/IRideRepository';
import { IActiveSessionsUseCase } from './IActiveSessionsUseCase';

export class ActiveSessionsUseCase implements IActiveSessionsUseCase {
  constructor(
    private readonly _hikeRepository: IHikeRepository,
    private readonly _rideRepository: IRideRepository
  ) {}

  async execute(userId: string): Promise<ActiveSession> {
    const activeHike = await this._hikeRepository.findUserActiveHike(userId);
    const activeRide = await this._rideRepository.findUserActiveRide(userId);

    return { activeRide, activeHike };
  }
}
