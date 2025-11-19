import { GetBookingLiveUseCase } from '../../../../application/usecases/User/RideBooking/GetBookingLiveUseCase';
import { GetRideBookingUseCase } from '../../../../application/usecases/User/RideBooking/GetRideBookingUseCase';
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

export function ridebookingComposer(): IRideBookingController {
  const rideBookinRepository = new RideBookingRepository();
  const rideRepository = new RideRepository();
  const hikeRepository = new HikeRepository();
  const userRepository = new MongoUserRepository();
  const googleApi = new GoogleApiService();
  const locationRepository = new LocationRepository();

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

  return new RideBookingController(
    getRideBookingUseCase,
    markDroppOffUseCase,
    getBookingLiveUseCase
  );
}
