import { ISaveSosContactsUseCase } from '../../../application/usecases/User/Sos/ISaveSosContactsUseCase';
import { IGetSosContactsUseCase } from '../../../application/usecases/User/Sos/IGetSosContactsUseCase';
import { ITriggerSosUseCase } from '../../../application/usecases/User/Sos/ITriggerSosUseCase';
import { ITriggerRideSosUseCase } from '../../../application/usecases/User/Sos/ITriggerRideSosUseCase';
import { HttpStatus } from '../../../domain/enums/HttpStatusCode';
import { Unauthorized } from '../../../domain/errors/CustomError';
import {
  saveSosContactsSchema,
  triggerSosSchema,
} from '../../validators/sosContactsValidator';
import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';
import { ISosController } from './ISosController';
import { ApiResponse } from '../helpers/implementation/apiResponse';

export class SosController implements ISosController {
  constructor(
    private readonly saveSosContactsUseCase: ISaveSosContactsUseCase,
    private readonly getSosContactsUseCase: IGetSosContactsUseCase,
    private readonly triggerSosUseCase: ITriggerSosUseCase,
    private readonly triggerRideSosUseCase: ITriggerRideSosUseCase
  ) {}

  async saveContacts(httpRequest: HttpRequest): Promise<HttpResponse> {
    const userId = httpRequest.user?.id;
    if (!userId) throw new Unauthorized();

    const parsed = saveSosContactsSchema.parse(httpRequest.body);

    const result = await this.saveSosContactsUseCase.execute({
      userId,
      contact: parsed,
    });

    const response = ApiResponse.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }

  async getContacts(httpRequest: HttpRequest): Promise<HttpResponse> {
    const userId = httpRequest.user?.id;
    if (!userId) throw new Unauthorized();

    const result = await this.getSosContactsUseCase.execute(userId);
    const response = ApiResponse.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }

  async triggerSos(httpRequest: HttpRequest): Promise<HttpResponse> {
    const userId = httpRequest.user?.id;
    if (!userId) throw new Unauthorized();

    const parsed = triggerSosSchema.parse(httpRequest.body);

    const result = await this.triggerSosUseCase.execute({
      userId,
      bookingId: parsed.bookingId,
      location: parsed.location,
    });

    const response = ApiResponse.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }

  async triggerRideSos(httpRequest: HttpRequest): Promise<HttpResponse> {
    const userId = httpRequest.user?.id;
    if (!userId) throw new Unauthorized();

    const { rideId, location } = httpRequest.body as {
      rideId: string;
      location?: { lat: number; lng: number };
    };

    const result = await this.triggerRideSosUseCase.execute({
      userId,
      rideId: rideId.trim(),
      location,
    });

    const response = ApiResponse.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }
}
