import { GetHikerPaymentInfoUseCase } from '../../../application/usecases/User/Hike/GetHikerPaymentInfo';
import { IPaymentController } from '../../../interfaces/http/controllers/IPaymentController';
import { PaymentController } from '../../../interfaces/http/controllers/payment.controller';
import { GoogleApiService } from '../../providers/GoogleApi';
import { HikeRepository } from '../../repositories/HikeRepository';
import { JoinRequestRepository } from '../../repositories/JoinRequestReqpository';
import { PaymentRepository } from '../../repositories/PaymentRepository';
import { MongoUserRepository } from '../../repositories/UserRepository';

export function paymentComposer(): IPaymentController {
  const paymentRepository = new PaymentRepository();
  const hikeRepository = new HikeRepository();
  const joinRepository = new JoinRequestRepository();
  const userRepository = new MongoUserRepository();
  const googleApi = new GoogleApiService();
  const getHikerPaymentInfoUseCase = new GetHikerPaymentInfoUseCase(
    paymentRepository,
    joinRepository,
    hikeRepository,
    userRepository,
    googleApi
  );

  return new PaymentController(getHikerPaymentInfoUseCase);
}
