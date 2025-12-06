import { Subscription } from '../../domain/entities/Subscription';
import { IBaseRepository } from './IBaseRepository';

export interface ISubscriptionRepository extends IBaseRepository<Subscription> {
  findActiveByUserId(userId: string): Promise<Subscription | null>;
  findByUserId(userId: string): Promise<Subscription[]>;
  findByStripeSubscriptionId(stripeSubscriptionId: string): Promise<Subscription | null>;
}
