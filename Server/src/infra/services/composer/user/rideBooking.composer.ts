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
import { ReqCancelRideBookingUseCase } from '../../../../application/usecases/User/RideBooking/ReqCancelRideBookingUseCase';
import { RefundService } from '../../../../application/services/RefundService';
import { SubscriptionRepository } from '../../../repositories/SubscriptionRepository';
import { SubscriptionService } from '../../../../application/services/SubscriptionService';
import { SubscriptionPlanRepository } from '../../../repositories/SubscriptionPlanRepository';
import { SocketServer } from '../../../../interfaces/sockets/socketInit';
import { SocketRealtimeGateway } from '../../../providers/SocketRealtimeGateway';
import { NotificationRepository } from '../../../repositories/NotificationRepository';
import { CreateNotificationUseCase } from '../../../../application/usecases/User/Notification/CreateNotificationUseCase';
import { WalletRepository } from '../../../repositories/WalletRepository';
import { WalletTransactionRepository } from '../../../repositories/WalletTransactionRepository';
import { BookingCancelRefundService } from '../../../../application/services/BookingCancelRefundService';

export function ridebookingComposer(): IRideBookingController {
  const rideBookinRepository = new RideBookingRepository();
  const rideRepository = new RideRepository();
  const hikeRepository = new HikeRepository();
  const userRepository = new MongoUserRepository();
  const googleApi = new GoogleApiService();
  const locationRepository = new LocationRepository();
  const taskRepository = new TaskRepository();
  const refundService = new RefundService(locationRepository, googleApi);
  const walletRepository = new WalletRepository();
  const walletTransactionRepository = new WalletTransactionRepository();
  const subscripitonRepository = new SubscriptionRepository();
  const subscriptionPlans = new SubscriptionPlanRepository();
  const io = SocketServer.getIo();
  const realtimeGateway = new SocketRealtimeGateway(io);
  const notificationRepository = new NotificationRepository();
  const createNotificationUseCase = new CreateNotificationUseCase(
    notificationRepository,
    realtimeGateway
  );

  const subscriptionService = new SubscriptionService(
    subscripitonRepository,
    subscriptionPlans
  );

  const getRideBookingUseCase = new GetRideBookingUseCase(
    rideBookinRepository,
    rideRepository,
    hikeRepository,
    userRepository,
    googleApi,
    locationRepository,
    subscriptionService
  );
  const transactionManager = new MongoTransactionManager([
    rideBookinRepository,
    hikeRepository,
    rideRepository,
    taskRepository,
    walletRepository,
    walletTransactionRepository,
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
    refundService,
    transactionManager,
    new BookingCancelRefundService(
      walletRepository,
      walletTransactionRepository,
      transactionManager
    ),
    createNotificationUseCase
  );

  const reqCancelRideBookingUseCase = new ReqCancelRideBookingUseCase(
    rideBookinRepository,
    refundService
  );

  return new RideBookingController(
    getRideBookingUseCase,
    markDroppOffUseCase,
    getBookingLiveUseCase,
    cancelRideBookingUseCase,
    reqCancelRideBookingUseCase
  );
}
