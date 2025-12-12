import type {
  SaveSosContactsResDTO,
  SosContactDTO,
} from '../../../../domain/dto/SosDTO';
import { ISosContactRepository } from '../../../repositories/ISosContactRepository';
import { IGetSosContactsUseCase } from './IGetSosContactsUseCase';

export class GetSosContactsUseCase implements IGetSosContactsUseCase {
  constructor(private readonly _sosRepository: ISosContactRepository) {}

  async execute(userId: string): Promise<SaveSosContactsResDTO> {
    const existing = await this._sosRepository.findByUserId(userId);

    const contacts: SosContactDTO[] = existing.map(c => ({
      id: c.getId()!,
      name: c.getName(),
      phone: c.getPhone(),
      email: c.getEmail(),
      relation: c.getRelation(),
    }));

    return {
      userId,
      contacts,
    };
  }
}
