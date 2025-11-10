import { GetHikerPaymentInfoUseCase } from '../../../application/usecases/User/Hike/GetHikerPaymentInfo';
import { ConfirmHikerPaymentUseCase } from '../../../application/usecases/User/payment/ConfirmHikerPayment';
import { CreatePaymentIntentUseCase } from '../../../application/usecases/User/payment/CreatePaymentIntent';
import { IPaymentController } from '../../../interfaces/http/controllers/IPaymentController';
import { PaymentController } from '../../../interfaces/http/controllers/payment.controller';
import { MongoTransactionManager } from '../../database/MongoTransactionManger';
import { GoogleApiService } from '../../providers/GoogleApi';
import { WinstonLogger } from '../../providers/winstonLogger';
import { HikeRepository } from '../../repositories/HikeRepository';
import { JoinRequestRepository } from '../../repositories/JoinRequestReqpository';
import { PaymentRepository } from '../../repositories/PaymentRepository';
import { RideBookingRepository } from '../../repositories/RideBookingRepository';
import { RideRepository } from '../../repositories/RideRepository';
import { MongoUserRepository } from '../../repositories/UserRepository';
import { StripePaymentService } from '../PaymentService';

export function paymentComposer(): IPaymentController {
  const paymentRepository = new PaymentRepository();
  const hikeRepository = new HikeRepository();
  const joinRepository = new JoinRequestRepository();
  const userRepository = new MongoUserRepository();
  const googleApi = new GoogleApiService();
  const paymentService = new StripePaymentService();
  const rideRepository = new RideRepository();
  const rideBookingRepository = new RideBookingRepository();
  const logger = new WinstonLogger();

  const transactionManager = new MongoTransactionManager([
    paymentRepository,
    rideRepository,
    joinRepository,
    hikeRepository,
    rideBookingRepository,
  ]);

  const getHikerPaymentInfoUseCase = new GetHikerPaymentInfoUseCase(
    paymentRepository,
    joinRepository,
    hikeRepository,
    userRepository,
    googleApi
  );
  const createPaymentIntentUseCase = new CreatePaymentIntentUseCase(
    paymentService,
    paymentRepository,
    logger
  );

  const confirmHikerPaymentUseCase = new ConfirmHikerPaymentUseCase(
    paymentService,
    paymentRepository,
    rideRepository,
    joinRepository,
    hikeRepository,
    rideBookingRepository,
    transactionManager
  );

  return new PaymentController(
    getHikerPaymentInfoUseCase,
    createPaymentIntentUseCase,
    confirmHikerPaymentUseCase
  );
}
