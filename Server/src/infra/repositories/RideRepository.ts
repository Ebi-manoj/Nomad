import { IRideRepository } from '../../application/repositories/IRideRepository';
import { RideLog } from '../../domain/entities/Ride';
import { IRideLog, RideLogModel } from '../database/ridelog.mode';
import { rideMapper } from '../mappers/rideDomainMapper';
import { MongoBaseRepository } from './BaseRepository';

export class RideRepository
  extends MongoBaseRepository<RideLog, IRideLog>
  implements IRideRepository
{
  constructor() {
    super(RideLogModel, rideMapper);
  }
}
