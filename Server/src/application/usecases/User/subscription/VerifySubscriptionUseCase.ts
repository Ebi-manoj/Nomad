import {
  VerifySubscripitonReqDTO,
  VerifySubscriptionResDTO,
} from '../../../../domain/dto/SubscriptionDTO';
import { Forbidden } from '../../../../domain/errors/CustomError';
import { SubscriptionSessionNotFound } from '../../../../domain/errors/SubscriptionError';
import { subscriptionMapper } from '../../../../infra/mappers/subscriptionDomainMapper';
import { SubscriptionMapper } from '../../../mappers/SubscriptionMapper';
import { ICheckoutSessionRepository } from '../../../repositories/ICheckoutSessionRepository';
import { ISubscriptionRepository } from '../../../repositories/ISubscriptionRepository';
import { IVerifySubscriptionUseCase } from './IVerifySubscriptionUseCase';

export class VerifySubscriptionUseCase implements IVerifySubscriptionUseCase {
  constructor(
    private readonly checkoutSession: ICheckoutSessionRepository,
    private readonly subscriptionRepository: ISubscriptionRepository
  ) {}

  async execute(
    data: VerifySubscripitonReqDTO
  ): Promise<VerifySubscriptionResDTO> {
    const checkoutSession = await this.checkoutSession.getByStripeSessionId(
      data.sessionId
    );
    if (!checkoutSession) throw new SubscriptionSessionNotFound();

    if (checkoutSession.userId !== data.userId) throw new Forbidden();

    const subscription = await this.subscriptionRepository.findActiveByUserId(
      data.userId
    );
    console.log(subscription);

    if (subscription) {
      return {
        status: 'completed',
        subscription: SubscriptionMapper(subscription),
      };
    }

    return {
      status: 'processing',
      subscription: null,
    };
  }
}
