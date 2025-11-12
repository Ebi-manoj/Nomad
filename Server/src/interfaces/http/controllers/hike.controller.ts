import { HttpStatusCode } from 'axios';
import {
  CreateHikeDTO,
  CreateJoinRequestDTO,
} from '../../../domain/dto/HikeDTO';
import { HttpStatus } from '../../../domain/enums/HttpStatusCode';
import { ApiDTO } from '../helpers/implementation/apiDTO';
import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';
import { IHikeController } from './IHikeController';
import { ICreateHikeUseCase } from '../../../application/usecases/User/Hike/ICreateHikeUseCase';
import { IFindMatchRideUseCase } from '../../../application/usecases/User/Hike/IFindMatchRideUseCase';
import { ICreateJoinRequestUseCase } from '../../../application/usecases/User/Hike/ICreateJoinRequestUseCase';

export class HikeController implements IHikeController {
  constructor(
    private readonly createHikeUseCase: ICreateHikeUseCase,
    private readonly findMatchRidesUseCase: IFindMatchRideUseCase,
    private readonly createJoinRequestUseCase: ICreateJoinRequestUseCase
  ) {}
  async createHike(httpRequest: HttpRequest): Promise<HttpResponse> {
    const dto: CreateHikeDTO = httpRequest.body as CreateHikeDTO;
    const result = await this.createHikeUseCase.execute(dto);
    const response = ApiDTO.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }

  async matchRides(httpRequest: HttpRequest): Promise<HttpResponse> {
    const dto = httpRequest.body as { hikeId: string };

    const result = await this.findMatchRidesUseCase.execute(dto.hikeId);
    const response = ApiDTO.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }
  async joinRideRequest(httpRequest: HttpRequest): Promise<HttpResponse> {
    const dto = httpRequest.body as CreateJoinRequestDTO;
    const result = await this.createJoinRequestUseCase.execute(dto);
    const response = ApiDTO.success(result);
    return new HttpResponse(HttpStatusCode.Ok, response);
  }
}
