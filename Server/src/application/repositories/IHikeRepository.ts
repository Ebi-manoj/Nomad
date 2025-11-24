import { HikeLog } from '../../domain/entities/Hike';
import { IBaseRepository } from './IBaseRepository';

export interface IHikeRepository extends IBaseRepository<HikeLog> {
  findUserActiveHike(userId: string): Promise<HikeLog | null>;
  findByUserId(userId: string): Promise<HikeLog | null>;
  findUserHikes(
    userId: string,
    skip: number,
    status?: string
  ): Promise<HikeLog[]>;
  findCountUserHikes(userId: string, status?: string): Promise<number>;
}
