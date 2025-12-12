import {
  SentOTPRequestDTO,
  SentOTPResponseDTO,
} from '../../../domain/dto/authDTO';
import { OTP_EXPIRY } from '../../../domain/enums/Constants';
import { SuccessMessages } from '../../../domain/enums/SuccessMessage';
import { UserNotFound } from '../../../domain/errors/CustomError';
import { Email } from '../../../domain/value-objects/email';
import { OTP } from '../../../domain/value-objects/otp';
import { IEmailTransporter } from '../../providers/IEmailTransporter';
import { IOTPRepository } from '../../repositories/IOTPRepository';
import { IUserRepository } from '../../repositories/IUserRepository';
import { ISendResetOTPUseCase } from './ISendResetOTP';

export class SendResetOTPUseCase implements ISendResetOTPUseCase {
  constructor(
    private readonly _emailTransporter: IEmailTransporter,
    private readonly _otpRepository: IOTPRepository,
    private readonly _userRepostiroy: IUserRepository
  ) {}

  async execute(data: SentOTPRequestDTO): Promise<SentOTPResponseDTO> {
    const emailVO = new Email(data.email);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpVO = new OTP(otp);

    const isExist = await this._userRepostiroy.findByEmail(emailVO.getValue());
    if (!isExist) throw new UserNotFound();

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
      message: SuccessMessages.OTP_SENT_SUCCESS,
      expiry: Date.now() + OTP_EXPIRY * 1000,
      email: emailVO.getValue(),
    };
  }
}
