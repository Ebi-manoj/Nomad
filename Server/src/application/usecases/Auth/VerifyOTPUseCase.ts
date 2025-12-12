import {
  VerifyOTPRequestDTO,
  VerifyOTPResponseDTO,
} from '../../../domain/dto/authDTO';
import { ACCESS_TOKEN_EXPIRY } from '../../../domain/enums/Constants';
import { SuccessMessages } from '../../../domain/enums/SuccessMessage';
import { InvalidOTP } from '../../../domain/errors/CustomError';
import { Email } from '../../../domain/value-objects/email';
import { OTP } from '../../../domain/value-objects/otp';
import { ITOkenGenerator } from '../../providers/ITokenGenerator';
import { IOTPRepository } from '../../repositories/IOTPRepository';
import { IVerifyOTPUseCase } from './IVerifOTPUseCase';

export class VerifyOTPUseCase implements IVerifyOTPUseCase {
  constructor(
    private readonly _otpRepository: IOTPRepository,
    private readonly _tokenGenerator: ITOkenGenerator
  ) {}

  async execute(data: VerifyOTPRequestDTO): Promise<VerifyOTPResponseDTO> {
    const emailVO = new Email(data.email);
    const otpVO = new OTP(data.otp);
    const storedOtp = await this._otpRepository.getOTP(emailVO.getValue());
    if (!storedOtp || storedOtp !== otpVO.getValue()) throw new InvalidOTP();
    const verificationToken = this._tokenGenerator.generateToken(
      { email: emailVO.getValue() },
      ACCESS_TOKEN_EXPIRY
    );
    return {
      email: emailVO.getValue(),
      verificationToken,
      message: SuccessMessages.VERIFIED_SUCCESS,
    };
  }
}
