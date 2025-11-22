import { GetBookingLiveUseCase } from '../../../../application/usecases/User/RideBooking/GetBookingLiveUseCase';
import { GetRideBookingUseCase } from '../../../../application/usecases/User/RideBooking/GetRideBookingUseCase';
import { CancelRideBookingUseCase } from '../../../../application/usecases/User/RideBooking/CancelRideBookingUseCase';
import { MarkDropOffUseCase } from '../../../../application/usecases/User/Task/MarkDroppOffUseCase';
import { IRideBookingController } from '../../../../interfaces/http/controllers/IRideBookingController';
import { RideBookingController } from '../../../../interfaces/http/controllers/rideBooking.controller';
import { MongoTransactionManager } from '../../../database/MongoTransactionManger';
import { GoogleApiService } from '../../../providers/GoogleApi';
import { HikeRepository } from '../../../repositories/HikeRepository';
import { LocationRepository } from '../../../repositories/LocationRepository';
import { RideBookingRepository } from '../../../repositories/RideBookingRepository';
import { RideRepository } from '../../../repositories/RideRepository';
import { MongoUserRepository } from '../../../repositories/UserRepository';
import { TaskRepository } from '../../../repositories/TaskRepository';

export function ridebookingComposer(): IRideBookingController {
  const rideBookinRepository = new RideBookingRepository();
  const rideRepository = new RideRepository();
  const hikeRepository = new HikeRepository();
  const userRepository = new MongoUserRepository();
  const googleApi = new GoogleApiService();
  const locationRepository = new LocationRepository();
  const taskRepository = new TaskRepository();

  const getRideBookingUseCase = new GetRideBookingUseCase(
    rideBookinRepository,
    rideRepository,
    hikeRepository,
    userRepository,
    googleApi,
    locationRepository
  );
  const transactionManager = new MongoTransactionManager([
    rideBookinRepository,
    hikeRepository,
    rideRepository,
    taskRepository,
  ]);

  const markDroppOffUseCase = new MarkDropOffUseCase(
    rideBookinRepository,
    hikeRepository,
    transactionManager
  );

  const getBookingLiveUseCase = new GetBookingLiveUseCase(
    rideBookinRepository,
    locationRepository,
    googleApi
  );

  const cancelRideBookingUseCase = new CancelRideBookingUseCase(
    rideBookinRepository,
    rideRepository,
    hikeRepository,
    taskRepository,
    locationRepository,
    googleApi,
    transactionManager
  );

  return new RideBookingController(
    getRideBookingUseCase,
    markDroppOffUseCase,
    getBookingLiveUseCase,
    cancelRideBookingUseCase
  );
}
