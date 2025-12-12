import { RideBookingOTPReqDTO } from '../../../../domain/dto/RideBookingDTO';
import { TaskType } from '../../../../domain/enums/Task';
import { Forbidden } from '../../../../domain/errors/CustomError';
import {
  TaskNotFound,
  TaskOTPNotFound,
} from '../../../../domain/errors/TaskError';
import { ITaskRepository } from '../../../repositories/ITaskRepository';
import { IGetRideBookingOTPUseCase } from './IGetRideBookingOTP';

export class GetRideBookingOTPUseCase implements IGetRideBookingOTPUseCase {
  constructor(private readonly _taskRepository: ITaskRepository) {}
  async execute(data: RideBookingOTPReqDTO): Promise<{ otp: string }> {
    const tasks = await this._taskRepository.findByRideBookingId(
      data.rideBookingId
    );
    const pickupTask = tasks.find(t => t.getTaskType() == TaskType.PICKUP);
    if (!pickupTask) throw new TaskNotFound();

    if (pickupTask.getHikerId() !== data.userId) throw new Forbidden();
    const otp = pickupTask.getOtp();

    if (!otp) throw new TaskOTPNotFound();
    return { otp };
  }
}
