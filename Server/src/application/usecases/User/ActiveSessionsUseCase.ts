import { ActiveSession } from '../../../domain/dto/authDTO';
import { hikeMapper } from '../../mappers/HikeMapper';
import { rideMapper } from '../../mappers/RideMapper';
import { IHikeRepository } from '../../repositories/IHikeRepository';
import { IRideRepository } from '../../repositories/IRideRepository';
import { IActiveSessionsUseCase } from './IActiveSessionsUseCase';

export class ActiveSessionsUseCase implements IActiveSessionsUseCase {
  constructor(
    private readonly _hikeRepository: IHikeRepository,
    private readonly _rideRepository: IRideRepository
  ) {}

  async execute(userId: string): Promise<ActiveSession> {
    const hike = await this._hikeRepository.findUserActiveHike(userId);
    const ride = await this._rideRepository.findUserActiveRide(userId);

    return {
      activeHike: hike ? hikeMapper(hike) : null,
      activeRide: ride ? rideMapper(ride) : null,
    };
  }
}
