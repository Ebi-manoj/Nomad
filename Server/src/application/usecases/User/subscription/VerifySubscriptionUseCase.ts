import {
  VerifySubscripitonReqDTO,
  VerifySubscriptionResDTO,
} from '../../../../domain/dto/SubscriptionDTO';
import { Forbidden } from '../../../../domain/errors/CustomError';
import { SubscriptionSessionNotFound } from '../../../../domain/errors/SubscriptionError';
import { SubscriptionMapper } from '../../../mappers/SubscriptionMapper';
import { ICheckoutSessionRepository } from '../../../repositories/ICheckoutSessionRepository';
import { ISubscriptionRepository } from '../../../repositories/ISubscriptionRepository';
import { IVerifySubscriptionUseCase } from './IVerifySubscriptionUseCase';

export class VerifySubscriptionUseCase implements IVerifySubscriptionUseCase {
  constructor(
    private readonly _checkoutSession: ICheckoutSessionRepository,
    private readonly _subscriptionRepository: ISubscriptionRepository
  ) {}

  async execute(
    data: VerifySubscripitonReqDTO
  ): Promise<VerifySubscriptionResDTO> {
    const checkoutSession = await this._checkoutSession.getByStripeSessionId(
      data.sessionId
    );
    if (!checkoutSession) throw new SubscriptionSessionNotFound();

    if (checkoutSession.userId !== data.userId) throw new Forbidden();

    const subscription = await this._subscriptionRepository.findActiveByUserId(
      data.userId
    );
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
