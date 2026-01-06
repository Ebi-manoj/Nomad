import { CreateRideDTO, RideResponseDTO } from '../../../../domain/dto/RideDTO';

export interface ICreateRideUseCase {
  execute(data: CreateRideDTO): Promise<RideResponseDTO>;
}
