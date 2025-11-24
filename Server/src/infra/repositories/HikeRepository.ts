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
    const hike = await this.model.findOne({ userId, status: 'active' });
    if (!hike) return null;
    return this.mapper.toDomain(hike);
  }
  async findByUserId(userId: string): Promise<HikeLog | null> {
    const hike = await this.model.findOne({ userId });
    return hike ? this.mapper.toDomain(hike) : null;
  }

  async findUserHikes(
    userId: string,
    skip: number,
    status?: string
  ): Promise<HikeLog[]> {
    const query: any = { userId };
    if (status && status !== 'all') {
      query.status = status;
    }

    const hikes = await this.model
      .find(query)
      .skip(skip)
      .sort({ createdAt: -1 });
    return hikes.map(h => this.mapper.toDomain(h));
  }
  async findCountUserHikes(userId: string, status?: string): Promise<number> {
    const query: any = { userId };
    if (status && status !== 'all') {
      query.status = status;
    }
    const hikesCount = await this.model.countDocuments(query);
    return hikesCount;
  }
}
