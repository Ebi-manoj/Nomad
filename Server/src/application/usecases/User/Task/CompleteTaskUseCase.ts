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
import { RideNotFound } from '../../../../domain/errors/RideErrors';
import {
  HikerNotMarkedDropOff,
  TaskAlreadyComplted,
  TaskNotFound,
  TaskNotInHighestPriority,
} from '../../../../domain/errors/TaskError';
import { IRideBookingRepository } from '../../../repositories/IRideBooking';
import { IRideRepository } from '../../../repositories/IRideRepository';
import { ITaskRepository } from '../../../repositories/ITaskRepository';
import { ICompleteTaskUseCase } from './ICompleteTaskUseCase';
import { IRealtimeGateway } from '../../../providers/IRealtimeGateway';

export class CompleteTaskUseCase implements ICompleteTaskUseCase {
  constructor(
    private readonly _taskRepository: ITaskRepository,
    private readonly _bookingRepository: IRideBookingRepository,
    private readonly _rideRepository: IRideRepository,
    private readonly _realtime: IRealtimeGateway
  ) {}

  async execute(data: CompleteTaskReqDTO): Promise<CompleteTaskResponseDTO> {
    const task = await this._taskRepository.findById(data.taskId);
    if (!task) throw new TaskNotFound();

    if (task.getRiderId() !== data.userId) throw new Forbidden();

    if (task.getStatus() !== TaskStatus.PENDING)
      throw new TaskAlreadyComplted();

    const tasks = await this._taskRepository.findByRideId(task.getRideId());
    const pendingTask = tasks.find(t => t.getStatus() == TaskStatus.PENDING);
    if (!pendingTask || pendingTask.getId() !== data.taskId)
      throw new TaskNotInHighestPriority();

    if (task.getTaskType() == TaskType.PICKUP) {
      if (!data.otp || data.otp !== task.getOtp()) throw new InvalidOTP();
    }

    const booking = await this._bookingRepository.findById(
      task.getRideBookingId()
    );
    if (!booking) throw new RideBookingNotFound();

    const ride = await this._rideRepository.findById(booking.getRideId());
    if (!ride) throw new RideNotFound();

    if (task.getTaskType() == TaskType.DROPOFF) {
      if (booking.getStatus() !== RideBookingStatus.DROPPEDOFF)
        throw new HikerNotMarkedDropOff();
      ride.releaseSeats(booking.getSeatsBooked());
    }

    const bookingStatus =
      task.getTaskType() == TaskType.PICKUP
        ? RideBookingStatus.PICKEDUP
        : RideBookingStatus.COMPLETED;

    booking.setStatus(bookingStatus);
    task.complete();

    const [updatedBooking, updatedTask, updatedRide] = await Promise.all([
      this._bookingRepository.update(booking.getId(), booking),
      this._taskRepository.update(task.getId(), task),
      this._rideRepository.update(ride.getRideId(), ride),
    ]);
    if (!updatedTask || !updatedRide) throw new UpdateFailed();

    
    if (bookingStatus === RideBookingStatus.PICKEDUP) {
      await this._realtime.emitToRoom(
        '/hiker',
        booking.getHikeId(),
        'ride:picked_up',
        {
          bookingId: booking.getId(),
          rideId: booking.getRideId(),
          status: booking.getStatus(),
        }
      );
    }

    return {
      taskId: updatedTask.getId()!,
      status: updatedTask.getStatus(),
      seatsAvailable: updatedRide.getSeatsAvailable(),
    };
  }
}
