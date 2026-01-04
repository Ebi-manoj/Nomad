import { GetAdminRidesResDTO } from '../../../domain/dto/adminRidesDTO';

export interface IGetAllRideUseCase {
  execute(
    page: number,
    status?: string,
    search?: string,
    sort?: 'newest' | 'oldest'
  ): Promise<GetAdminRidesResDTO>;
}
