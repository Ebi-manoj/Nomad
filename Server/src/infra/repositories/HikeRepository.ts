import { IHikeRepository } from '../../application/repositories/IHikeRepository';
import { HikeLog } from '../../domain/entities/Hike';
import { IHikeLog } from '../database/hikelog.model';
import { MongoBaseRepository } from './BaseRepository';

export class HikeRepository
  extends MongoBaseRepository<HikeLog, IHikeLog>
  implements IHikeRepository {}
