import {
  type SaveSosContactsReqDTO,
  type SaveSosContactsResDTO,
  type SosContactDTO,
} from '../../../../domain/dto/SosDTO';
import { InvalidInputData } from '../../../../domain/errors/CustomError';
import { SosContact } from '../../../../domain/entities/SosContact';
import { ISosContactRepository } from '../../../repositories/ISosContactRepository';
import { ISaveSosContactsUseCase } from './ISaveSosContactsUseCase';
import { ErrorMessages } from '../../../../domain/enums/ErrorMessage';

export class SaveSosContactsUseCase implements ISaveSosContactsUseCase {
  constructor(private readonly _sosRepository: ISosContactRepository) {}

  async execute(data: SaveSosContactsReqDTO): Promise<SaveSosContactsResDTO> {
    const { userId, contact } = data;

    const existing = await this._sosRepository.findByUserId(userId);

    if (existing.length >= 3) {
      throw new InvalidInputData(ErrorMessages.SOS_MAX_CONTACTS_LIMIT);
    }

    const sos = new SosContact({
      userId,
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
      relation: contact.relation,
    });

    const created = await this._sosRepository.create(sos);

    const allContacts = [...existing, created];

    const contacts: SosContactDTO[] = allContacts.map(c => ({
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
