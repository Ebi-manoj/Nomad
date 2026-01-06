import { GetAllHikesResDTO } from '../../../domain/dto/adminHikesDTO';

export interface IGetAllHikesUseCase {
  execute(
    page: number,
    status?: string,
    search?: string,
    sort?: 'newest' | 'oldest'
  ): Promise<GetAllHikesResDTO>;
}
