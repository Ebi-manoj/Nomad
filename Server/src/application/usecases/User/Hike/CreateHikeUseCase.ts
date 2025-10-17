import { CreateHikeDTO } from '../../../../domain/dto/HikeDTO';
import { HikeLog } from '../../../../domain/entities/Hike';
import { HikeStatus } from '../../../../domain/enums/Hike';
import { UserNotFound } from '../../../../domain/errors/CustomError';
import { IGoogleApi } from '../../../providers/IGoogleApi';
import { IHikeRepository } from '../../../repositories/IHikeRepository';
import { UserRepository } from '../../../repositories/UserRepository';

export class CreateHikeUseCase {
  constructor(
    private readonly hikeRepository: IHikeRepository,
    private readonly userRepository: UserRepository,
    private readonly googleApis: IGoogleApi
  ) {}

  async execute(data: CreateHikeDTO) {
    const user = await this.userRepository.findById(data.userId);
    if (!user) throw new UserNotFound();
    const pickup = {
      lat: data.pickup.coordinates[0],
      lng: data.pickup.coordinates[1],
    };
    const destination = {
      lat: data.destination.coordinates[0],
      lng: data.destination.coordinates[1],
    };

    const totalDistance = await this.googleApis.getDistance(
      pickup,
      destination
    );
    const hike = new HikeLog({
      ...data,
      totalDistance,
      status: HikeStatus.REQUESTED,
    });

    return await this.hikeRepository.create(hike);
  }
}
