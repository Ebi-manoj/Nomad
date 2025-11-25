import type {
  SaveSosContactsReqDTO,
  SaveSosContactsResDTO,
} from '../../../../domain/dto/SosDTO';

export interface ISaveSosContactsUseCase {
  execute(data: SaveSosContactsReqDTO): Promise<SaveSosContactsResDTO>;
}
