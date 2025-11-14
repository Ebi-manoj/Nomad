import { RideBooking } from '../../../../domain/entities/RideBooking';

export interface ICreateTasksUseCase {
  execute(booking: RideBooking): Promise<void>;
}
