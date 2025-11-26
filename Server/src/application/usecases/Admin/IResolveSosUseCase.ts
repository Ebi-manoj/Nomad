import { SosLogResDTO } from '../../../domain/dto/SosDTO';

export interface IResolveSosUseCase {
  execute(sosLogId: string): Promise<SosLogResDTO>;
}
