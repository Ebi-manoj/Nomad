import { ISaveSosContactsUseCase } from '../../../application/usecases/User/Sos/ISaveSosContactsUseCase';
import { IGetSosContactsUseCase } from '../../../application/usecases/User/Sos/IGetSosContactsUseCase';
import { HttpStatus } from '../../../domain/enums/HttpStatusCode';
import { Unauthorized } from '../../../domain/errors/CustomError';
import { saveSosContactsSchema } from '../../validators/sosContactsValidator';
import { ApiDTO } from '../helpers/implementation/apiDTO';
import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';
import { ISosController } from './ISosController';

export class SosController implements ISosController {
  constructor(
    private readonly saveSosContactsUseCase: ISaveSosContactsUseCase,
    private readonly getSosContactsUseCase: IGetSosContactsUseCase
  ) {}

  async saveContacts(httpRequest: HttpRequest): Promise<HttpResponse> {
    const userId = httpRequest.user?.id;
    if (!userId) throw new Unauthorized();

    const parsed = saveSosContactsSchema.parse(httpRequest.body);

    const result = await this.saveSosContactsUseCase.execute({
      userId,
      contact: parsed,
    });

    const response = ApiDTO.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }

  async getContacts(httpRequest: HttpRequest): Promise<HttpResponse> {
    const userId = httpRequest.user?.id;
    if (!userId) throw new Unauthorized();

    const result = await this.getSosContactsUseCase.execute(userId);
    const response = ApiDTO.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }
}
