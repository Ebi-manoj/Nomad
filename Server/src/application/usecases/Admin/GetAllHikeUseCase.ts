import { GetAllHikesResDTO } from '../../../domain/dto/adminHikesDTO';
import { hikeMapper } from '../../mappers/HikeMapper';
import { IHikeRepository } from '../../repositories/IHikeRepository';
import { IGetAllHikesUseCase } from './IGetAllHikeUseCase';

export class GetAllHikeUseCase implements IGetAllHikesUseCase {
  constructor(private readonly hikeRepository: IHikeRepository) {}
  async execute(page: number, status?: string): Promise<GetAllHikesResDTO> {
    const LIMIT = 10;
    const skip = (page - 1) * LIMIT;

    const hikes = await this.hikeRepository.findAllHikes(LIMIT, skip, status);
    const countHikes = await this.hikeRepository.countHikes(status);

    const response = hikes.map(h => hikeMapper(h));
    return {
      hikes: response,
      total: countHikes,
    };
  }
}
