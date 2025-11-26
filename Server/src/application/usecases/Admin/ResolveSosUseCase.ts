import { SosLogResDTO } from '../../../domain/dto/SosDTO';
import { UpdateFailed } from '../../../domain/errors/CustomError';
import { SosLogNotFound } from '../../../domain/errors/SosErrors';
import { sosLogMapper } from '../../mappers/SosLogMapper';
import { ISosLogRepository } from '../../repositories/ISosLogRepository';
import { IResolveSosUseCase } from './IResolveSosUseCase';

export class ResolveSosUseCase implements IResolveSosUseCase {
  constructor(private readonly sosLogRepository: ISosLogRepository) {}
  async execute(sosLogId: string): Promise<SosLogResDTO> {
    const log = await this.sosLogRepository.findById(sosLogId);
    if (!log) throw new SosLogNotFound();

    log.resolve();

    const updatedLog = await this.sosLogRepository.update(log.getId()!, log);
    if (!updatedLog) throw new UpdateFailed();
    return sosLogMapper(updatedLog);
  }
}
