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

    let userIds: string[] | undefined = undefined;
    if (query.search && query.search.trim()) {
      const users = await this._userRepository.fetchUsers(100, 0, query.search);
      userIds = users
        .map(u => u.getId())
        .filter((id): id is string => typeof id === 'string');
      if (userIds.length === 0) {
        return { logs: [], totalCount: 0 };
      }
    }

    const logs = await this._sosLogRepository.findAllFiltered(skip, limit, {
      status: query.status,
      userIds,
      sort: query.sort,
    });
    const totalCount = await this._sosLogRepository.countDocumentsFiltered({
      status: query.status ,
      userIds,
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
