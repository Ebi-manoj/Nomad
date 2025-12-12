import {
  adminHikeResponseDTO,
  GetAllHikesResDTO,
} from '../../../domain/dto/adminHikesDTO';
import { hikeMapper } from '../../mappers/HikeMapper';
import { userMapper } from '../../mappers/UserResponse.mapper';
import { IHikeRepository } from '../../repositories/IHikeRepository';
import { IUserRepository } from '../../repositories/IUserRepository';
import { IGetAllHikesUseCase } from './IGetAllHikeUseCase';

export class GetAllHikeUseCase implements IGetAllHikesUseCase {
  constructor(
    private readonly _hikeRepository: IHikeRepository,
    private readonly _userRepository: IUserRepository
  ) {}
  async execute(page: number, status?: string): Promise<GetAllHikesResDTO> {
    const LIMIT = 5;
    const skip = (page - 1) * LIMIT;

    const hikes = await this._hikeRepository.findAllHikes(LIMIT, skip, status);
    const result = await Promise.all(
      hikes.map(async h => {
        const user = await this._userRepository.findById(h.getUserId());
        if (user) {
          const response: adminHikeResponseDTO = {
            ...hikeMapper(h),
            user: userMapper(user),
          };
          return response;
        }
      })
    );
    const response: adminHikeResponseDTO[] = result.filter(
      (r): r is adminHikeResponseDTO => r !== undefined
    );
    const countHikes = await this._hikeRepository.countHikes(status);
    const hikeMetrics = await this._hikeRepository.getStatusCounts();

    return {
      hikes: response,
      total: countHikes,
      hikeMetrics,
    };
  }
}
