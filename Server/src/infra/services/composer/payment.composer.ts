import { GetHikerPaymentInfoUseCase } from '../../../application/usecases/User/Hike/GetHikerPaymentInfo';
import { CreatePaymentIntentUseCase } from '../../../application/usecases/User/payment/CreatePaymentIntent';
import { IPaymentController } from '../../../interfaces/http/controllers/IPaymentController';
import { PaymentController } from '../../../interfaces/http/controllers/payment.controller';
import { GoogleApiService } from '../../providers/GoogleApi';
import { WinstonLogger } from '../../providers/winstonLogger';
import { HikeRepository } from '../../repositories/HikeRepository';
import { JoinRequestRepository } from '../../repositories/JoinRequestReqpository';
import { PaymentRepository } from '../../repositories/PaymentRepository';
import { MongoUserRepository } from '../../repositories/UserRepository';
import { StripePaymentService } from '../PaymentService';

export function paymentComposer(): IPaymentController {
  const paymentRepository = new PaymentRepository();
  const hikeRepository = new HikeRepository();
  const joinRepository = new JoinRequestRepository();
  const userRepository = new MongoUserRepository();
  const googleApi = new GoogleApiService();
  const paymentService = new StripePaymentService();
  const logger = new WinstonLogger();
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

  return new PaymentController(
    getHikerPaymentInfoUseCase,
    createPaymentIntentUseCase
  );
}
