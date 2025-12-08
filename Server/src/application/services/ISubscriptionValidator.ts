import { ISubscriptionService } from './ISubscriptionService';

export interface ISubscriptionValidator extends ISubscriptionService {
  validateJoinRequest(hikeId: string, userId: string): Promise<void>;
  validateRideAcceptance(userId: string): Promise<void>;
  validateCreateRide(costSharing: number, userId: string): Promise<void>;
}
