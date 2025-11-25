import { SaveSosContactsUseCase } from '../../../../application/usecases/User/Sos/SaveSosContactsUseCase';
import { ISosController } from '../../../../interfaces/http/controllers/ISosController';
import { SosController } from '../../../../interfaces/http/controllers/sos.controller';
import { SosContactRepository } from '../../../repositories/SosContactRepository';

export function sosComposer(): ISosController {
  const sosRepository = new SosContactRepository();
  const saveSosContactsUseCase = new SaveSosContactsUseCase(sosRepository);

  return new SosController(saveSosContactsUseCase);
}
