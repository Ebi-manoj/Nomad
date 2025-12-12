import {
  SentOTPRequestDTO,
  SentOTPResponseDTO,
} from '../../../domain/dto/authDTO';
import { OTP_EXPIRY } from '../../../domain/enums/Constants';
import { SuccessMessages } from '../../../domain/enums/SuccessMessage';
import { UserAlreadyExist } from '../../../domain/errors/CustomError';
import { Email } from '../../../domain/value-objects/email';
import { OTP } from '../../../domain/value-objects/otp';
import { IEmailTransporter } from '../../providers/IEmailTransporter';
import { IOTPRepository } from '../../repositories/IOTPRepository';
import { IUserRepository } from '../../repositories/IUserRepository';
import { ISendSignupOTPUseCase } from './ISendOTPSignupUseCase';

export class SendSignupOTPUseCase implements ISendSignupOTPUseCase {
  constructor(
    private readonly _emailTransporter: IEmailTransporter,
    private readonly _otpRepository: IOTPRepository,
    private readonly _userRepository: IUserRepository
  ) {}

  async execute(data: SentOTPRequestDTO): Promise<SentOTPResponseDTO> {
    const emailVO = new Email(data.email);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpVO = new OTP(otp);
    const isExist = await this._userRepository.findByEmail(emailVO.getValue());
    if (isExist) throw new UserAlreadyExist();

    await this._otpRepository.saveOTP(
      emailVO.getValue(),
      otpVO.getValue(),
      OTP_EXPIRY
    );
    await this._emailTransporter.sendEmail(
      emailVO.getValue(),
      otpVO.getValue()
    );
    console.log(otp);
    return {
      email: emailVO.getValue(),
      expiry: Date.now() + OTP_EXPIRY * 1000,
      message: SuccessMessages.OTP_SENT_SUCCESS,
    };
  }
}
