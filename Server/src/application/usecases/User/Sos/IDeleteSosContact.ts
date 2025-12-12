import {
  DeleteSosContactReqDTO,
  DeleteSosContactResDTO,
} from '../../../../domain/dto/SosDTO';

export interface IDeleteSosContactUseCase {
  execute(data: DeleteSosContactReqDTO): Promise<DeleteSosContactResDTO>;
}
