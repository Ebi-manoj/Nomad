import { GetRidesResDTO } from '../../../domain/dto/RideDTO';

export interface IGetAllRideUseCase {
  execute(page: number, status?: string): Promise<GetRidesResDTO>;
}
