import { JoinRequestResponseDTO } from '../../../../domain/dto/HikeDTO';
import { joinRequestMapper } from '../../../mappers/JoinRequestMapper';
import { IHikeRepository } from '../../../repositories/IHikeRepository';
import { IJoinRequestRepository } from '../../../repositories/IJoinRequestsRepository';
import { UserRepository } from '../../../repositories/UserRepository';

export class GetPendingRequestUseCase {
  constructor(
    private readonly joinRequestRepository: IJoinRequestRepository,
    private readonly hikeRepository: IHikeRepository,
    private readonly userRepository: UserRepository
  ) {}

  async execute(rideId: string): Promise<JoinRequestResponseDTO[]> {
    const joinRequests = await this.joinRequestRepository.findByRideId(rideId);

    const requests = await Promise.all(
      joinRequests.map(async jr => {
        const hike = await this.hikeRepository.findById(jr.getHikeId());
        const user =
          hike && (await this.userRepository.findById(hike?.getUserId()));
        if (user && hike) {
          return joinRequestMapper(jr, hike, user);
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
