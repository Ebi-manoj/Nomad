import type { SaveSosContactsResDTO } from '../../../../domain/dto/SosDTO';

export interface IGetSosContactsUseCase {
  execute(userId: string): Promise<SaveSosContactsResDTO>;
}
