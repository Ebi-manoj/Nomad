import { CreateHikeUseCase } from '../../../application/usecases/User/Hike/CreateHikeUseCase';
import { FindMatchRideUseCase } from '../../../application/usecases/User/Hike/findMatchRidesUseCase';
import { CreateHikeDTO } from '../../../domain/dto/HikeDTO';
import { RideMatchDTO } from '../../../domain/dto/RideMatch';
import { HttpStatus } from '../../../domain/enums/HttpStatusCode';
import { ApiDTO } from '../helpers/implementation/apiDTO';
import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';
import { IHikeController } from './IHikeController';

export class HikeController implements IHikeController {
  constructor(
    private readonly createHikeUseCase: CreateHikeUseCase,
    private readonly findMatchRidesUseCase: FindMatchRideUseCase
  ) {}
  async createHike(httpRequest: HttpRequest): Promise<HttpResponse> {
    const dto: CreateHikeDTO = httpRequest.body as CreateHikeDTO;
    const result = await this.createHikeUseCase.execute(dto);
    const response = ApiDTO.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }

  async matchRides(httpRequest: HttpRequest): Promise<HttpResponse> {
    const dto: RideMatchDTO = httpRequest.body as RideMatchDTO;

    const result = await this.findMatchRidesUseCase.execute(dto);
    const response = ApiDTO.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }
}
