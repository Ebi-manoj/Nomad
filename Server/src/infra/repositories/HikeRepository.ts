import { IHikeRepository } from '../../application/repositories/IHikeRepository';
import { HikeLog } from '../../domain/entities/Hike';
import { HikeLogModel, IHikeLog } from '../database/hikelog.model';
import { hikeMapper } from '../mappers/hikeDomainMapper';
import { MongoBaseRepository } from './BaseRepository';

export class HikeRepository
  extends MongoBaseRepository<HikeLog, IHikeLog>
  implements IHikeRepository
{
  constructor() {
    super(HikeLogModel, hikeMapper);
  }
  async findUserActiveHike(userId: string): Promise<HikeLog | null> {
    return await this.model.findOne({ userId, status: 'active' });
  }
}
