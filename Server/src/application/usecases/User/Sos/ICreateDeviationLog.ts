import {
  CreateDeviationReqDTO,
  RouteDeviationResDTO,
} from '../../../../domain/dto/RouteDeviationDTO';

export interface ICreateDeviationLogUseCase {
  execute(data: CreateDeviationReqDTO): Promise<void>;
}
