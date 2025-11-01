import { JoinRequest } from '../../domain/entities/JoinRequests';
import { IBaseRepository } from './IBaseRepository';

export interface IJoinRequestRepository extends IBaseRepository<JoinRequest> {
  checkPendingRequest(hikeId: string, rideId: string): Promise<boolean>;
  findByHikeId(hikeId: string): Promise<JoinRequest[]>;
  findByRideId(rideId: string): Promise<JoinRequest[]>;
}
