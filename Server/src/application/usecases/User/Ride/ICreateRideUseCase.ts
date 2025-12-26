import { CreateRideDTO, RideResponseDTO } from '../../../../domain/dto/RideDTO';
import { RideLog } from '../../../../domain/entities/Ride';

export interface ICreateRideUseCase {
  execute(data: CreateRideDTO): Promise<RideResponseDTO>;
}
