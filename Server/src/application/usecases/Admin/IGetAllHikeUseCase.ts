import { GetAllHikesResDTO } from '../../../domain/dto/adminHikesDTO';

export interface IGetAllHikesUseCase {
  execute(page: number, status?: string): Promise<GetAllHikesResDTO>;
}
