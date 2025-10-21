import { Socket } from 'socket.io';
import { UpdateLocationUseCase } from '../../../application/usecases/User/Ride/UpdateLocationUseCase';
import { UpdateLocationDTO } from '../../../domain/dto/RideDTO';
import { IRiderLocationController } from './IRiderLocationController';

export class RiderLocationController implements IRiderLocationController {
  constructor(private readonly updateLocationUseCase: UpdateLocationUseCase) {}

  async handleLocationUpdate(
    socket: Socket,
    data: UpdateLocationDTO
  ): Promise<void> {
    try {
      await this.updateLocationUseCase.execute(data);
      socket.emit('location:update:success', {
        message: 'Location updated successfully',
      });
    } catch (error) {
      console.log(error);
      socket.emit('location:update:error', { message: 'An error occured' });
    }
  }
}
