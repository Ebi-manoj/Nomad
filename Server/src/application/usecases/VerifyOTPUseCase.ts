import {
  VerifyOTPRequestDTO,
  VerifyOTPResponseDTO,
} from '../../domain/dto/authDTO';
import { SuccessMessages } from '../../domain/enums/SuccessMessage';
import { InvalidOTP } from '../../domain/errors/CustomError';
import { Email } from '../../domain/value-objects/email';
import { OTP } from '../../domain/value-objects/otp';
import { ITOkenGenerator } from '../providers/ITokenGenerator';
import { IOTPRepository } from '../repositories/IOTPRepository';

export class VerifyOTPUseCase {
  constructor(
    private readonly otpRepository: IOTPRepository,
    private readonly tokenGenerator: ITOkenGenerator
  ) {}

  async execute(data: VerifyOTPRequestDTO): Promise<VerifyOTPResponseDTO> {
    const emailVO = new Email(data.email);
    const otpVO = new OTP(data.otp);
    const storedOtp = await this.otpRepository.getOTP(emailVO.getValue());
    if (!storedOtp || storedOtp !== otpVO.getValue()) throw new InvalidOTP();
    const verificationToken = this.tokenGenerator.generateToken(
      { email: emailVO.getValue() },
      '5min'
    );
    return {
      email: emailVO.getValue(),
      verificationToken,
      message: SuccessMessages.VERIFIED_SUCCESS,
    };
  }
}
