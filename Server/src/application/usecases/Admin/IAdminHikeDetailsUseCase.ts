import { AdminGetHikeDetailsResDTO } from '../../../domain/dto/adminHikesDTO';

export interface IAdminGetHikeDetailsUseCase {
  execute(hikeId: string): Promise<AdminGetHikeDetailsResDTO>;
}
