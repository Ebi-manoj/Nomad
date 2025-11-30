import { GetAdminRidesResDTO } from '../../../domain/dto/adminRidesDTO';

export interface IGetAllRideUseCase {
  execute(page: number, status?: string): Promise<GetAdminRidesResDTO>;
}
