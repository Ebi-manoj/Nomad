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
import { GetHikeDetailsUseCase } from '../../../../application/usecases/User/Hike/GetHikeDetails';
import { RideBookingRepository } from '../../../repositories/RideBookingRepository';
import { GetAllHikesUseCase } from '../../../../application/usecases/User/Hike/GetAllHikesUseCase';
import { ReviewRepository } from '../../../repositories/ReviewRepository';
import { SubscriptionValidator } from '../../../../application/services/SubscriptionValidator';
import { SubscriptionRepository } from '../../../repositories/SubscriptionRepository';
import { SubscriptionUsageRepository } from '../../../repositories/SubscriptionUsageRepository';
import { SubscriptionUsageService } from '../../../../application/services/SubscriptionUsageService';
import { SubscriptionService } from '../../../../application/services/SubscriptionService';
import { SubscriptionPlanRepository } from '../../../repositories/SubscriptionPlanRepository';
import { NotificationRepository } from '../../../repositories/NotificationRepository';
import { CreateNotificationUseCase } from '../../../../application/usecases/User/Notification/CreateNotificationUseCase';

export function hikeComposer(): IHikeController {
  const userRepository = new MongoUserRepository();
  const hikeRepository = new HikeRepository();
  const rideRepository = new RideRepository();
  const googleapis = new GoogleApiService();
  const durationCalculator = new DurationCalculator();
  const locationRepository = new LocationRepository();
  const joinRequestRepository = new JoinRequestRepository();
  const paymentRepository = new PaymentRepository();
  const bookingRepository = new RideBookingRepository();
  const fareCalculator = new FareCalculator();
  const io = SocketServer.getIo();
  const realtimeGateway = new SocketRealtimeGateway(io);
  const reviewRepository = new ReviewRepository();
  const notificationRepository = new NotificationRepository();
  const createNotificationUseCase = new CreateNotificationUseCase(
    notificationRepository,
    realtimeGateway
  );

  const subscriptionRepo = new SubscriptionRepository();
  const subscriptionUsage = new SubscriptionUsageRepository();
  const subscriptionPlans = new SubscriptionPlanRepository();
  const geoService = new TurfGeoService();
  const subscriptionService = new SubscriptionService(
    subscriptionRepo,
    subscriptionPlans
  );
  const usageService = new SubscriptionUsageService(subscriptionUsage);
  const subscriptionValidator = new SubscriptionValidator(
    subscriptionRepo,
    subscriptionPlans,
    joinRequestRepository,
    usageService
  );

  const rideMatchService = new RideMatchService(
    userRepository,
    durationCalculator,
    locationRepository,
    subscriptionService
  );

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
    realtimeGateway,
    subscriptionValidator,
    usageService,
    createNotificationUseCase
  );

  const gethikeDetailsUseCase = new GetHikeDetailsUseCase(
    hikeRepository,
    bookingRepository,
    paymentRepository,
    userRepository,
    reviewRepository,
    subscriptionService
  );

  const getAllHikesUseCase = new GetAllHikesUseCase(hikeRepository);

  return new HikeController(
    createHikeUseCase,
    findMatchRidesUseCase,
    createJoinRequestUseCase,
    gethikeDetailsUseCase,
    getAllHikesUseCase
  );
}
