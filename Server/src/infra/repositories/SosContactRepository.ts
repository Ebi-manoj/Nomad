import { MongoBaseRepository } from './BaseRepository';
import { ISosContactRepository } from '../../application/repositories/ISosContactRepository';
import { SosContact } from '../../domain/entities/SosContact';
import { ISosContactModel, SosContactModel } from '../database/sosContact.model';
import { sosContactMapper } from '../mappers/sosContactMapper';

export class SosContactRepository
  extends MongoBaseRepository<SosContact, ISosContactModel>
  implements ISosContactRepository
{
  constructor() {
    super(SosContactModel, sosContactMapper);
  }

  async findByUserId(userId: string): Promise<SosContact[]> {
    const docs = await this.model.find({ userId });
    return docs.map(doc => this.mapper.toDomain(doc));
  }

  async deleteByUserId(userId: string): Promise<void> {
    await this.model.deleteMany({ userId });
  }
}
