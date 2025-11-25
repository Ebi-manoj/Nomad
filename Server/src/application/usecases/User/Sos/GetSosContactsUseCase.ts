import type {
  SaveSosContactsResDTO,
  SosContactDTO,
} from '../../../../domain/dto/SosDTO';
import { ISosContactRepository } from '../../../repositories/ISosContactRepository';
import { IGetSosContactsUseCase } from './IGetSosContactsUseCase';

export class GetSosContactsUseCase implements IGetSosContactsUseCase {
  constructor(private readonly sosRepository: ISosContactRepository) {}

  async execute(userId: string): Promise<SaveSosContactsResDTO> {
    const existing = await this.sosRepository.findByUserId(userId);

    const contacts: SosContactDTO[] = existing.map(c => ({
      name: c.getName(),
      phone: c.getPhone(),
      relation: c.getRelation(),
    }));

    return {
      userId,
      contacts,
    };
  }
}
