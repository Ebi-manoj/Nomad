import {
  SentOTPRequestDTO,
  SentOTPResponseDTO,
} from '../../../domain/dto/authDTO';

export interface ISendSignupOTPUseCase {
  execute(data: SentOTPRequestDTO): Promise<SentOTPResponseDTO>;
}
