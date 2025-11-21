import { EndRideReqDTO, EndRideResDTO } from '../../../../domain/dto/RideDTO';
import { RideStatus } from '../../../../domain/enums/Ride';
import { Forbidden, UpdateFailed } from '../../../../domain/errors/CustomError';
import {
  RideHavePendingTasks,
  RideIsNotActiveStatus,
  RideNotFound,
} from '../../../../domain/errors/RideErrors';
import { IRideRepository } from '../../../repositories/IRideRepository';
import { ITaskRepository } from '../../../repositories/ITaskRepository';
import { IEndRideUseCase } from './IEndRideUseCase';

export class EndRideUseCase implements IEndRideUseCase {
  constructor(
    private readonly rideRepository: IRideRepository,
    private readonly taskRepository: ITaskRepository
  ) {}
  async execute(data: EndRideReqDTO): Promise<EndRideResDTO> {
    const ride = await this.rideRepository.findById(data.rideId);
    if (!ride) throw new RideNotFound();

    if (ride.getStatus() !== RideStatus.ACTIVE)
      throw new RideIsNotActiveStatus();

    if (ride.getRiderId() !== data.userId) throw new Forbidden();

    const pendingTask = await this.taskRepository.findPendingTasks(data.rideId);
    if (pendingTask.length) throw new RideHavePendingTasks();

    ride.complete();
    const updated = await this.rideRepository.update(ride.getRideId()!, ride);
    if (!updated) throw new UpdateFailed();
    return {
      rideId: updated.getRideId()!,
      status: updated.getStatus(),
    };
  }
}
