import {
  CompleteTaskReqDTO,
  CompleteTaskResponseDTO,
} from '../../../../domain/dto/TaskDTO';
import { RideBookingStatus } from '../../../../domain/enums/RideBooking';
import { TaskStatus, TaskType } from '../../../../domain/enums/Task';
import {
  Forbidden,
  InvalidOTP,
  UpdateFailed,
} from '../../../../domain/errors/CustomError';
import { RideBookingNotFound } from '../../../../domain/errors/RideBookingError';
import {
  HikerNotMarkedDropOff,
  TaskAlreadyComplted,
  TaskNotFound,
  TaskNotInHighestPriority,
} from '../../../../domain/errors/TaskError';
import { IRideBookingRepository } from '../../../repositories/IRideBooking';
import { ITaskRepository } from '../../../repositories/ITaskRepository';
import { ICompleteTaskUseCase } from './ICompleteTaskUseCase';

export class CompleteTaskUseCase implements ICompleteTaskUseCase {
  constructor(
    private readonly taskRepository: ITaskRepository,
    private readonly bookingRepository: IRideBookingRepository
  ) {}

  async execute(data: CompleteTaskReqDTO): Promise<CompleteTaskResponseDTO> {
    const task = await this.taskRepository.findById(data.taskId);
    if (!task) throw new TaskNotFound();

    if (task.getRiderId() !== data.userId) throw new Forbidden();

    if (task.getStatus() !== TaskStatus.PENDING)
      throw new TaskAlreadyComplted();

    const tasks = await this.taskRepository.findByRideId(task.getRideId());
    const pendingTask = tasks.find(t => t.getStatus() == TaskStatus.PENDING);
    if (!pendingTask || pendingTask.getId() !== data.taskId)
      throw new TaskNotInHighestPriority();

    if (task.getTaskType() == TaskType.PICKUP) {
      if (!data.otp || data.otp !== task.getOtp()) throw new InvalidOTP();
    }

    const booking = await this.bookingRepository.findById(
      task.getRideBookingId()
    );
    if (!booking) throw new RideBookingNotFound();

    if (task.getTaskType() == TaskType.DROPOFF) {
      if (booking.getStatus() !== RideBookingStatus.DROPPEDOFF)
        throw new HikerNotMarkedDropOff();
    }

    const bookingStatus =
      task.getTaskType() == TaskType.PICKUP
        ? RideBookingStatus.PICKEDUP
        : RideBookingStatus.COMPLETED;

    booking.setStatus(bookingStatus);
    task.complete();

    const [updatedBooking, updatedTask] = await Promise.all([
      this.bookingRepository.update(booking.getId(), booking),
      this.taskRepository.update(task.getId(), task),
    ]);
    if (!updatedTask) throw new UpdateFailed();

    return {
      taskId: updatedTask.getId()!,
      status: updatedTask.getStatus(),
    };
  }
}
