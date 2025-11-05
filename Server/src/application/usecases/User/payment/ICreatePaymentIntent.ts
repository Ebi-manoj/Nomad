import {
  paymentIntentRequestDTO,
  paymentIntentResponseDTO,
} from '../../../../domain/dto/paymentService';

export interface ICreatePaymentIntentUseCase {
  execute(data: paymentIntentRequestDTO): Promise<paymentIntentResponseDTO>;
}
