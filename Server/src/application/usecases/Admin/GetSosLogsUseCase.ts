import type {
  GetSosLogsQuery,
  GetSosLogsResDTO,
  SosLogResWithUser,
} from '../../../domain/dto/SosDTO';
import { sosLogMapper } from '../../mappers/SosLogMapper';
import { userMapper } from '../../mappers/UserResponse.mapper';
import type { ISosLogRepository } from '../../repositories/ISosLogRepository';
import { IUserRepository } from '../../repositories/IUserRepository';
import type { IGetSosLogsUseCase } from './IGetSosLogsUseCase';

export class GetSosLogsUseCase implements IGetSosLogsUseCase {
  constructor(
    private readonly _sosLogRepository: ISosLogRepository,
    private readonly _userRepository: IUserRepository
  ) {}

  async execute(query: GetSosLogsQuery): Promise<GetSosLogsResDTO> {
    const limit = 5;
    const skip = (query.page - 1) * limit;

    const logs = await this._sosLogRepository.findAll(skip, limit, {
      status: query.status,
    });
    const totalCount = await this._sosLogRepository.countDocuments({
      status: query.status,
    });

    const result = await Promise.all(
      logs.map(async l => {
        const user = await this._userRepository.findById(l.getUserId());
        if (user) {
          const dto: SosLogResWithUser = {
            ...sosLogMapper(l),
            initiaterDetails: userMapper(user),
          };
          return dto;
        }
      })
    );

    const response = result.filter(
      (res): res is SosLogResWithUser => res !== undefined
    );

    return {
      logs: response,
      totalCount,
    };
  }
}
