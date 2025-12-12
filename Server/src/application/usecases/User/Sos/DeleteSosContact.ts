import {
  DeleteSosContactReqDTO,
  DeleteSosContactResDTO,
} from '../../../../domain/dto/SosDTO';
import { SuccessMessages } from '../../../../domain/enums/SuccessMessage';
import { Forbidden } from '../../../../domain/errors/CustomError';
import { SosContactNotFound } from '../../../../domain/errors/SosErrors';
import { ISosContactRepository } from '../../../repositories/ISosContactRepository';
import { IDeleteSosContactUseCase } from './IDeleteSosContact';

export class DeleteSosContactUseCase implements IDeleteSosContactUseCase {
  constructor(private readonly _sosRepository: ISosContactRepository) {}

  async execute(data: DeleteSosContactReqDTO): Promise<DeleteSosContactResDTO> {
    const contact = await this._sosRepository.findById(data.id);
    if (!contact) throw new SosContactNotFound();
    if (data.userId !== contact.getUserId()) throw new Forbidden();

    await this._sosRepository.delete(data.id);

    return {
      id: data.id,
      message: SuccessMessages.CONTACT_DELETED,
    };
  }
}
