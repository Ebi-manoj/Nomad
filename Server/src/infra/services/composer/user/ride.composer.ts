import { FareCalculator } from '../../../../application/services/FareCalculator';
import { AcceptJoinRequestUseCase } from '../../../../application/usecases/User/Ride/AcceptJoinRequest';
import { CreateRideUseCase } from '../../../../application/usecases/User/Ride/CreateRideUseCase';
import { DeclineJoinRequestUseCase } from '../../../../application/usecases/User/Ride/DeclineJoinRequest';
import { GetPendingRequestUseCase } from '../../../../application/usecases/User/Ride/GetPendingRequestUseCase';
import { IRideController } from '../../../../interfaces/http/controllers/IRideController';
import { RideController } from '../../../../interfaces/http/controllers/ride.controller';
import { SocketServer } from '../../../../interfaces/sockets/socketInit';
import { SocketRealtimeGateway } from '../../../providers/SocketRealtimeGateway';
import { GoogleApiService } from '../../../providers/GoogleApi';
import { HikeRepository } from '../../../repositories/HikeRepository';
import { JoinRequestRepository } from '../../../repositories/JoinRequestReqpository';
import { PaymentRepository } from '../../../repositories/PaymentRepository';
import { RideRepository } from '../../../repositories/RideRepository';
import { MongoUserRepository } from '../../../repositories/UserRepository';
import { GetHikersMatchedUseCase } from '../../../../application/usecases/User/Ride/GetHikersMatched';
import { RideBookingRepository } from '../../../repositories/RideBookingRepository';
import { EndRideUseCase } from '../../../../application/usecases/User/Ride/EndRideUseCase';
import { GetRideDetailsUseCase } from '../../../../application/usecases/User/Ride/GetRideDetailsUseCase';
import { GetAllRidesUseCase } from '../../../../application/usecases/User/Ride/GetAllRidesUseCase';
import { TaskRepository } from '../../../repositories/TaskRepository';
import { WalletRepository } from '../../../repositories/WalletRepository';
import { WalletTransactionRepository } from '../../../repositories/WalletTransactionRepository';
import { MongoTransactionManager } from '../../../database/MongoTransactionManger';
import { FindOrCreateWalletService } from '../../../../application/services/FindOrCreateWalletService';
import { ReviewRepository } from '../../../repositories/ReviewRepository';
import { SubscriptionRepository } from '../../../repositories/SubscriptionRepository';
import { SubscriptionUsageRepository } from '../../../repositories/SubscriptionUsageRepository';
import { SubscriptionUsageService } from '../../../../application/services/SubscriptionUsageService';
import { SubscriptionValidator } from '../../../../application/services/SubscriptionValidator';
import { SubscriptionService } from '../../../../application/services/SubscriptionService';
import { SubscriptionPlanRepository } from '../../../repositories/SubscriptionPlanRepository';
import { RouteDeviationRepository } from '../../../repositories/RouteDeviationRepository';
import { CalculateRideSafetyScoreUseCase } from '../../../../application/usecases/User/Ride/CalculateRideSafetyScoreUseCase';

export function rideComposer(): IRideController {
  const userRepository = new MongoUserRepository();
  const googleApis = new GoogleApiService();
  const rideRepository = new RideRepository();
  const joinRequestRepository = new JoinRequestRepository();
  const hikeRepository = new HikeRepository();
  const paymentRepository = new PaymentRepository();
  const taskRepository = new TaskRepository();
  const fareCalculator = new FareCalculator();
  const io = SocketServer.getIo();
  const realtimeGateway = new SocketRealtimeGateway(io);
  const ridebookingRepository = new RideBookingRepository();
  const walletRepository = new WalletRepository();
  const walletTransactionRepository = new WalletTransactionRepository();
  const walletService = new FindOrCreateWalletService(walletRepository);
  const reviewRepository = new ReviewRepository();
  const subscriptionPlans = new SubscriptionPlanRepository();
  const subscriptionRepository = new SubscriptionRepository();
  const subscriptionUsage = new SubscriptionUsageRepository();
  const routeDeviationRepository = new RouteDeviationRepository();
  const transactionManager = new MongoTransactionManager([
    rideRepository,
    ridebookingRepository,
    walletRepository,
    walletTransactionRepository,
  ]);

  const usageService = new SubscriptionUsageService(subscriptionUsage);
  const subscriptionValidator = new SubscriptionValidator(
    subscriptionRepository,
    subscriptionPlans,
    joinRequestRepository,
    usageService
  );
  const subscriptionService = new SubscriptionService(
    subscriptionRepository,
    subscriptionPlans
  );

  const createRideUseCase = new CreateRideUseCase(
    userRepository,
    googleApis,
    rideRepository,
    subscriptionValidator
  );

  const getPendingRequestUseCase = new GetPendingRequestUseCase(
    joinRequestRepository,
    hikeRepository,
    userRepository,
    subscriptionService
  );

  const acceptJoinRequestUseCase = new AcceptJoinRequestUseCase(
    hikeRepository,
    rideRepository,
    joinRequestRepository,
    paymentRepository,
    fareCalculator,
    realtimeGateway,
    subscriptionValidator,
    usageService
  );

  const declienJoinRequestUseCase = new DeclineJoinRequestUseCase(
    joinRequestRepository,
    rideRepository,
    realtimeGateway
  );

  const getHikersMatchedUseCase = new GetHikersMatchedUseCase(
    rideRepository,
    ridebookingRepository,
    hikeRepository,
    userRepository,
    subscriptionService
  );

  const endRideUseCase = new EndRideUseCase(
    rideRepository,
    taskRepository,
    ridebookingRepository,
    walletRepository,
    walletTransactionRepository,
    walletService,
    transactionManager,
    fareCalculator,
    subscriptionService,
    userRepository,
    new CalculateRideSafetyScoreUseCase(routeDeviationRepository)
  );

  const getRideDetailsUseCase = new GetRideDetailsUseCase(
    rideRepository,
    ridebookingRepository,
    userRepository,
    hikeRepository,
    reviewRepository,
    subscriptionService
  );

  const getAllRidesUseCase = new GetAllRidesUseCase(rideRepository);

  return new RideController(
    createRideUseCase,
    getPendingRequestUseCase,
    acceptJoinRequestUseCase,
    declienJoinRequestUseCase,
    getHikersMatchedUseCase,
    endRideUseCase,
    getRideDetailsUseCase,
    getAllRidesUseCase
  );
}
