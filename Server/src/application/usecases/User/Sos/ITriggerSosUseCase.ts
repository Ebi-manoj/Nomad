import type {
  SosLogResDTO,
  TriggerSosReqDTO,
} from '../../../../domain/dto/SosDTO';

export interface ITriggerSosUseCase {
  execute(data: TriggerSosReqDTO): Promise<SosLogResDTO>;
}
