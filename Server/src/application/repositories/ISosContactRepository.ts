import { SosContact } from '../../domain/entities/SosContact';
import { IBaseRepository } from './IBaseRepository';

export interface ISosContactRepository
  extends IBaseRepository<SosContact> {
  findByUserId(userId: string): Promise<SosContact[]>;
  deleteByUserId(userId: string): Promise<void>;
}
