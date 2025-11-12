import { RideBooking } from '../../../../domain/entities/RideBooking';
import { Task } from '../../../../domain/entities/Task';

export interface ICreateTasksUseCase {
  execute(booking: RideBooking): Promise<void>;
}
