import { ActiveSession } from '../../../domain/dto/authDTO';

export interface IActiveSessionsUseCase {
  execute(userId: string): Promise<ActiveSession>;
}
