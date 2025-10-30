import { HttpStatusCode } from 'axios';
import { CreateHikeUseCase } from '../../../application/usecases/User/Hike/CreateHikeUseCase';
import { CreateJoinRequestUseCase } from '../../../application/usecases/User/Hike/CreateJoinRequestUseCase';
import { FindMatchRideUseCase } from '../../../application/usecases/User/Hike/findMatchRidesUseCase';
import {
  CreateHikeDTO,
  CreateJoinRequestDTO,
} from '../../../domain/dto/HikeDTO';
import { HttpStatus } from '../../../domain/enums/HttpStatusCode';
import { ApiDTO } from '../helpers/implementation/apiDTO';
import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';
import { IHikeController } from './IHikeController';
import { Server } from 'socket.io';

export class HikeController implements IHikeController {
  constructor(
    private readonly createHikeUseCase: CreateHikeUseCase,
    private readonly findMatchRidesUseCase: FindMatchRideUseCase,
    private readonly createJoinRequestUseCase: CreateJoinRequestUseCase,
    private io: Server
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

    this.io.of('/rider').to(result.rideId).emit('join-request:new', result);

    return new HttpResponse(HttpStatusCode.Ok, response);
  }
}
