import { UpdateLocationDTO } from '../../../domain/dto/RideDTO';
import { IRiderLocationController } from './IRiderLocationController';
import { IUpdateLocationUseCase } from '../../../application/usecases/User/Ride/IUpdateLocationUseCase';
import { IRealtimeGateway } from '../../../application/providers/IRealtimeGateway';

export class RiderLocationController implements IRiderLocationController {
  constructor(
    private readonly _updateLocationUseCase: IUpdateLocationUseCase,
    private readonly _realtimeGateway: IRealtimeGateway
  ) {}

  async handleLocationUpdate(
    socketId: string,
    data: UpdateLocationDTO
  ): Promise<void> {
    try {
      await this._updateLocationUseCase.execute(data);
      await this._realtimeGateway.emitToSocket(
        socketId,
        'location:update:success',
        {
          message: 'Location updated successfully',
        }
      );
    } catch (error) {
      console.log(error);
      await this._realtimeGateway.emitToSocket(
        socketId,
        'location:update:error',
        {
          message: 'An error occured',
        }
      );
    }
  }
}
