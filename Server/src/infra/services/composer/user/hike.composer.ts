import { DurationCalculator } from '../../../../application/services/DurationCalculator';
import { FareCalculator } from '../../../../application/services/FareCalculator';
import { RideMatchService } from '../../../../application/services/RideMatchService';
import { CreateHikeUseCase } from '../../../../application/usecases/User/Hike/CreateHikeUseCase';
import { CreateJoinRequestUseCase } from '../../../../application/usecases/User/Hike/CreateJoinRequestUseCase';
import { FindMatchRideUseCase } from '../../../../application/usecases/User/Hike/findMatchRidesUseCase';
import { HikeController } from '../../../../interfaces/http/controllers/hike.controller';
import { IHikeController } from '../../../../interfaces/http/controllers/IHikeController';
import { SocketServer } from '../../../../interfaces/sockets/socketInit';
import { SocketRealtimeGateway } from '../../../providers/SocketRealtimeGateway';
import { GoogleApiService } from '../../../providers/GoogleApi';
import { TurfGeoService } from '../../../providers/turfGeroService';
import { HikeRepository } from '../../../repositories/HikeRepository';
import { JoinRequestRepository } from '../../../repositories/JoinRequestReqpository';
import { LocationRepository } from '../../../repositories/LocationRepository';
import { PaymentRepository } from '../../../repositories/PaymentRepository';
import { RideRepository } from '../../../repositories/RideRepository';
import { MongoUserRepository } from '../../../repositories/UserRepository';

export function hikeComposer(): IHikeController {
  const userRepository = new MongoUserRepository();
  const hikeRepository = new HikeRepository();
  const rideRepository = new RideRepository();
  const googleapis = new GoogleApiService();
  const durationCalculator = new DurationCalculator();
  const locationRepository = new LocationRepository();
  const joinRequestRepository = new JoinRequestRepository();
  const paymentRepository = new PaymentRepository();
  const fareCalculator = new FareCalculator();
  const io = SocketServer.getIo();
  const realtimeGateway = new SocketRealtimeGateway(io);
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
    hikeRepository,
    joinRequestRepository,
    paymentRepository
  );

  const createJoinRequestUseCase = new CreateJoinRequestUseCase(
    joinRequestRepository,
    rideRepository,
    hikeRepository,
    fareCalculator,
    userRepository,
    realtimeGateway
  );

  return new HikeController(
    createHikeUseCase,
    findMatchRidesUseCase,
    createJoinRequestUseCase
  );
}
