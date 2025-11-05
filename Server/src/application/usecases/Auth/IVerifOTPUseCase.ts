import {
  VerifyOTPRequestDTO,
  VerifyOTPResponseDTO,
} from '../../../domain/dto/authDTO';

export interface IVerifyOTPUseCase {
  execute(data: VerifyOTPRequestDTO): Promise<VerifyOTPResponseDTO>;
}
