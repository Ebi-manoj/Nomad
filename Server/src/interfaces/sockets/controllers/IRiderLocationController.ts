import { Socket } from 'socket.io';
import { UpdateLocationDTO } from '../../../domain/dto/RideDTO';

export interface IRiderLocationController {
  handleLocationUpdate(socket: Socket, data: UpdateLocationDTO): Promise<void>;
}
