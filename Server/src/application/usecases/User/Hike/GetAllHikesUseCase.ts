import { GetHikesReqDTO, GetHikesResDTO } from '../../../../domain/dto/HikeDTO';
import { hikeMapper } from '../../../mappers/HikeMapper';
import { IHikeRepository } from '../../../repositories/IHikeRepository';
import { IGetAllHikesUseCase } from './IGetAllHikesUseCase';

export class GetAllHikesUseCase implements IGetAllHikesUseCase {
  constructor(private readonly _hikeRepository: IHikeRepository) {}

  async execute(data: GetHikesReqDTO): Promise<GetHikesResDTO> {
    const limit = 2;
    const { page, userId, status } = data;
    const skip = (page - 1) * limit;

    const hikes = await this._hikeRepository.findUserHikes(
      limit,
      skip,
      userId,
      status
    );
    const totalCount = await this._hikeRepository.findCountUserHikes(
      userId,
      status
    );

    const hikesData = hikes.map(h => hikeMapper(h));

    return {
      total: totalCount,
      hikes: hikesData,
    };
  }
}
