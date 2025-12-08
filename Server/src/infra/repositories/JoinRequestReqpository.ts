import { IJoinRequestRepository } from '../../application/repositories/IJoinRequestsRepository';
import { JoinRequest } from '../../domain/entities/JoinRequests';
import { JoinRequestStatus } from '../../domain/enums/Ride';
import { IJoinRequest, JoinRequestModel } from '../database/joinRequest.model';
import { joinRequestMapper } from '../mappers/joinRequestDomainMapper';
import { MongoBaseRepository } from './BaseRepository';

export class JoinRequestRepository
  extends MongoBaseRepository<JoinRequest, IJoinRequest>
  implements IJoinRequestRepository
{
  constructor() {
    super(JoinRequestModel, joinRequestMapper);
  }
  async checkPendingRequest(hikeId: string, rideId: string): Promise<boolean> {
    const requests = await this.model.countDocuments({ rideId, hikeId });
    return requests > 0;
  }
  async findByHikeId(hikeId: string): Promise<JoinRequest[]> {
    const requests = await this.model.find({ hikeId });
    return requests.map(r => this.mapper.toDomain(r));
  }
  async findByRideId(rideId: string): Promise<JoinRequest[]> {
    const requests = await this.model.find({ rideId });
    return requests.map(r => this.mapper.toDomain(r));
  }
  async findPendingOrAccepted(rideId: string): Promise<JoinRequest[]> {
    const requests = await this.model.find({
      rideId,
      status: { $in: [JoinRequestStatus.PENDING, JoinRequestStatus.ACCEPTED] },
    });

    return requests.map(r => this.mapper.toDomain(r));
  }

  async findRequestCountOfHike(hikeId: string): Promise<number> {
    return await this.model.countDocuments({ hikeId });
  }
}
