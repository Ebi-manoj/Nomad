import {
  VerifySubscripitonReqDTO,
  VerifySubscriptionResDTO,
} from '../../../../domain/dto/SubscriptionDTO';

export interface IVerifySubscriptionUseCase {
  execute(data: VerifySubscripitonReqDTO): Promise<VerifySubscriptionResDTO>;
}
