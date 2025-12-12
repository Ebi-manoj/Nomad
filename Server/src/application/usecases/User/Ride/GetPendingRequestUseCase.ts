import { JoinRequestResponseDTO } from '../../../../domain/dto/HikeDTO';
import { joinRequestMapper } from '../../../mappers/JoinRequestMapper';
import { IHikeRepository } from '../../../repositories/IHikeRepository';
import { IJoinRequestRepository } from '../../../repositories/IJoinRequestsRepository';
import { IUserRepository } from '../../../repositories/IUserRepository';
import { ISubscriptionService } from '../../../services/ISubscriptionService';
import { IGetPendingRequestUseCase } from './IGetPendingRequestUseCase';

export class GetPendingRequestUseCase implements IGetPendingRequestUseCase {
  constructor(
    private readonly _joinRequestRepository: IJoinRequestRepository,
    private readonly _hikeRepository: IHikeRepository,
    private readonly _userRepository: IUserRepository,
    private readonly _subscriptionService: ISubscriptionService
  ) {}

  async execute(rideId: string): Promise<JoinRequestResponseDTO[]> {
    const joinRequests =
      await this._joinRequestRepository.findPendingOrAccepted(rideId);

    const requests = await Promise.all(
      joinRequests.map(async jr => {
        const hike = await this._hikeRepository.findById(jr.getHikeId());
        const user =
          hike && (await this._userRepository.findById(hike?.getUserId()));
        if (user && hike) {
          const sub = await this._subscriptionService.getActiveSubscription(
            hike.getUserId()
          );
          return joinRequestMapper(jr, hike, user, sub.tier);
        }
        return undefined;
      })
    );
    const filtered = requests.filter((req): req is JoinRequestResponseDTO =>
      Boolean(req)
    );
    return filtered;
  }
}
