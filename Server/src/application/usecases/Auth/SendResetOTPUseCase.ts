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
import { UserRepository } from '../../repositories/UserRepository';

export class SendResetOTPUseCase {
  constructor(
    private readonly emailTransporter: IEmailTransporter,
    private readonly otpRepository: IOTPRepository,
    private readonly userRepostiroy: UserRepository
  ) {}

  async execute(data: SentOTPRequestDTO): Promise<SentOTPResponseDTO> {
    const emailVO = new Email(data.email);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpVO = new OTP(otp);

    const isExist = await this.userRepostiroy.findByEmail(emailVO.getValue());
    if (!isExist) throw new UserNotFound();

    await this.otpRepository.saveOTP(
      emailVO.getValue(),
      otpVO.getValue(),
      OTP_EXPIRY
    );
    await this.emailTransporter.sendEmail(emailVO.getValue(), otpVO.getValue());
    console.log(otp);

    return {
      message: SuccessMessages.OTP_SENT_SUCCESS,
      expiry: Date.now() + OTP_EXPIRY * 1000,
      email: emailVO.getValue(),
    };
  }
}
