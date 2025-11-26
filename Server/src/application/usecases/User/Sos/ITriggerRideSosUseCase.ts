import type {
  SosLogResDTO,
  TriggerRideSosReqDTO,
} from '../../../../domain/dto/SosDTO';

export interface ITriggerRideSosUseCase {
  execute(data: TriggerRideSosReqDTO): Promise<SosLogResDTO>;
}
