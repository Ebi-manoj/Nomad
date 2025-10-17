import { HikeLog } from '../../domain/entities/Hike';
import { IBaseRepository } from './IBaseRepository';

export interface IHikeRepository extends IBaseRepository<HikeLog> {}
