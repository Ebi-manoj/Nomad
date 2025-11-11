import { Socket } from 'socket.io';
import { UpdateLocationDTO } from '../../../domain/dto/RideDTO';
import { IRiderLocationController } from './IRiderLocationController';
import { IUpdateLocationUseCase } from '../../../application/usecases/User/Ride/IUpdateLocationUseCase';

export class RiderLocationController implements IRiderLocationController {
  constructor(private readonly updateLocationUseCase: IUpdateLocationUseCase) {}

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
