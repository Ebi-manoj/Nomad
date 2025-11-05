import {
  HikerPaymentInfoRequestDTO,
  HikerPaymentInfoResponseDTO,
} from '../../../../domain/dto/paymentDTO';

export interface IGetHikerPaymentInfoUseCase {
  execute(
    data: HikerPaymentInfoRequestDTO
  ): Promise<HikerPaymentInfoResponseDTO>;
}
