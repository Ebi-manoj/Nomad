import { HikeLog } from '../../domain/entities/Hike';
import { IBaseRepository } from './IBaseRepository';

export interface IHikeRepository extends IBaseRepository<HikeLog> {
  findUserActiveHike(userId: string): Promise<HikeLog | null>;
}
