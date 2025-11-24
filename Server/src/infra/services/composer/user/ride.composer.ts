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
  const createRideUseCase = new CreateRideUseCase(
    userRepository,
    googleApis,
    rideRepository
  );

  const getPendingRequestUseCase = new GetPendingRequestUseCase(
    joinRequestRepository,
    hikeRepository,
    userRepository
  );

  const acceptJoinRequestUseCase = new AcceptJoinRequestUseCase(
    hikeRepository,
    rideRepository,
    joinRequestRepository,
    paymentRepository,
    fareCalculator,
    realtimeGateway
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
    userRepository
  );

  const endRideUseCase = new EndRideUseCase(rideRepository, taskRepository);

  const getRideDetailsUseCase = new GetRideDetailsUseCase(
    rideRepository,
    ridebookingRepository,
    userRepository,
    hikeRepository
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
