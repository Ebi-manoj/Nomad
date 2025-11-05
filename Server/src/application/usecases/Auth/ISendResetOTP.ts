import {
  SentOTPRequestDTO,
  SentOTPResponseDTO,
} from '../../../domain/dto/authDTO';

export interface ISendResetOTPUseCase {
  execute(data: SentOTPRequestDTO): Promise<SentOTPResponseDTO>;
}
