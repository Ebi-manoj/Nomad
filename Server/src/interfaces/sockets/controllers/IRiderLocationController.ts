import { UpdateLocationDTO } from '../../../domain/dto/RideDTO';

export interface IRiderLocationController {
  handleLocationUpdate(
    socketId: string,
    data: UpdateLocationDTO
  ): Promise<void>;
}
