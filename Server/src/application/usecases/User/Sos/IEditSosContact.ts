import {
  EditSosContactReqDTO,
  SosContactDTO,
} from '../../../../domain/dto/SosDTO';

export interface IEditSosContactUseCase {
  execute(data: EditSosContactReqDTO): Promise<SosContactDTO>;
}
