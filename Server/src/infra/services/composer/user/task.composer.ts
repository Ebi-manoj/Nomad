import { CompleteTaskUseCase } from '../../../../application/usecases/User/Task/CompleteTaskUseCase';
import { GetRideBookingOTPUseCase } from '../../../../application/usecases/User/Task/GetRideBookingOTP';
import { GetTasksUseCase } from '../../../../application/usecases/User/Task/GetTasksUseCase';
import { ITaskController } from '../../../../interfaces/http/controllers/ITaskController';
import { TaskController } from '../../../../interfaces/http/controllers/task.controller';
import { RideBookingRepository } from '../../../repositories/RideBookingRepository';
import { RideRepository } from '../../../repositories/RideRepository';
import { TaskRepository } from '../../../repositories/TaskRepository';
import { MongoUserRepository } from '../../../repositories/UserRepository';

export function taskComposer(): ITaskController {
  const userRepository = new MongoUserRepository();
  const rideRepository = new RideRepository();
  const taskRepository = new TaskRepository();
  const bookingRepository = new RideBookingRepository();

  const getTasksUseCase = new GetTasksUseCase(
    taskRepository,
    rideRepository,
    userRepository
  );

  const getRideBookingOTPUseCase = new GetRideBookingOTPUseCase(taskRepository);

  const completeTaskUseCase = new CompleteTaskUseCase(
    taskRepository,
    bookingRepository,
    rideRepository
  );

  return new TaskController(
    getTasksUseCase,
    getRideBookingOTPUseCase,
    completeTaskUseCase
  );
}
