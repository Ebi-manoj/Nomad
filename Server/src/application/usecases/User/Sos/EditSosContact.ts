import {
  EditSosContactReqDTO,
  SosContactDTO,
} from '../../../../domain/dto/SosDTO';
import { Forbidden, UpdateFailed } from '../../../../domain/errors/CustomError';
import { SosContactNotFound } from '../../../../domain/errors/SosErrors';
import { ISosContactRepository } from '../../../repositories/ISosContactRepository';
import { IEditSosContactUseCase } from './IEditSosContact';

export class EditSosContactUseCase implements IEditSosContactUseCase {
  constructor(private readonly _sosContactsRepository: ISosContactRepository) {}

  async execute(data: EditSosContactReqDTO): Promise<SosContactDTO> {
    const sosContact = await this._sosContactsRepository.findById(data.id);
    if (!sosContact) throw new SosContactNotFound();

    if (sosContact.getUserId() !== data.userId) throw new Forbidden();
    sosContact.setName(data.contact.name);
    sosContact.setEmail(data.contact.email);
    sosContact.setPhone(data.contact.phone);
    sosContact.setRelation(data.contact.relation);

    const updatedContact = await this._sosContactsRepository.update(
      sosContact.getId(),
      sosContact
    );
    if (!updatedContact) throw new UpdateFailed();

    return updatedContact.toJson();
  }
}
