import {
  SentOTPRequestDTO,
  SentOTPResponseDTO,
} from '../../domain/dto/authDTO';
import { SuccessMessages } from '../../domain/enums/SuccessMessage';
import { Email } from '../../domain/value-objects/email';
import { OTP } from '../../domain/value-objects/otp';
import { IEmailTransporter } from '../providers/IEmailTransporter';
import { IOTPRepository } from '../repositories/IOTPRepository';

export class SendOTPUseCase {
  constructor(
    private readonly emailTransporter: IEmailTransporter,
    private readonly otpRepository: IOTPRepository
  ) {}

  async execute(data: SentOTPRequestDTO): Promise<SentOTPResponseDTO> {
    const emailVO = new Email(data.email);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpVO = new OTP(otp);

    await this.otpRepository.saveOTP(emailVO.getValue(), otpVO.getValue(), 300);
    await this.emailTransporter.sendEmail(emailVO.getValue(), otpVO.getValue());
    console.log(otp);
    return {
      email: emailVO.getValue(),
      message: SuccessMessages.OTP_SENT_SUCCESS,
    };
  }
}
