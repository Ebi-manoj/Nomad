import type {
  GetSosLogsQuery,
  GetSosLogsResDTO,
} from '../../../domain/dto/SosDTO';

export interface IGetSosLogsUseCase {
  execute(query: GetSosLogsQuery): Promise<GetSosLogsResDTO>;
}
