import { DurationCalculator } from '../../../../application/services/DurationCalculator';
import { RideMatchService } from '../../../../application/services/RideMatchService';
import { CreateHikeUseCase } from '../../../../application/usecases/User/Hike/CreateHikeUseCase';
import { FindMatchRideUseCase } from '../../../../application/usecases/User/Hike/findMatchRidesUseCase';
import { HikeController } from '../../../../interfaces/http/controllers/hike.controller';
import { IHikeController } from '../../../../interfaces/http/controllers/IHikeController';
import { GoogleApiService } from '../../../providers/GoogleApi';
import { TurfGeoService } from '../../../providers/turfGeroService';
import { HikeRepository } from '../../../repositories/HikeRepository';
import { LocationRepository } from '../../../repositories/LocationRepository';
import { RideRepository } from '../../../repositories/RideRepository';
import { MongoUserRepository } from '../../../repositories/UserRepository';

export function hikeComposer(): IHikeController {
  const userRepository = new MongoUserRepository();
  const hikeRepository = new HikeRepository();
  const rideRepository = new RideRepository();
  const googleapis = new GoogleApiService();
  const durationCalculator = new DurationCalculator();
  const locationRepository = new LocationRepository();
  const rideMatchService = new RideMatchService(
    userRepository,
    durationCalculator,
    locationRepository
  );
  const geoService = new TurfGeoService();

  const createHikeUseCase = new CreateHikeUseCase(
    hikeRepository,
    userRepository,
    googleapis
  );

  const findMatchRidesUseCase = new FindMatchRideUseCase(
    rideRepository,
    rideMatchService,
    geoService,
    hikeRepository
  );

  return new HikeController(createHikeUseCase, findMatchRidesUseCase);
}
