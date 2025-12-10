import { IEmailTransporter } from '../../application/providers/IEmailTransporter';
import nodemailer from 'nodemailer';
import { env } from '../utils/env';

export class NodemailerTransporter implements IEmailTransporter {
  private readonly transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: env.EMAIL_ADDRESS,
        pass: env.GOOGLE_APP_PASSWORD,
      },
    });
  }
  async sendEmail(email: string, data: string): Promise<void> {
    const mailOptions = {
      from: env.EMAIL_ADDRESS,
      to: email,
      subject: 'Hello from Nomad,Your one Time Password !',
      text: `This is the OTP for your Nomad account ${data},It expires in 2 minutes...`,
    };
    await this.transporter.sendMail(mailOptions);
  }
  async sendCustomEmail(
    email: string,
    subject: string,
    text: string,
    html?: string
  ): Promise<void> {
    const mailOptions = {
      from: env.EMAIL_ADDRESS,
      to: email,
      subject,
      text,
      html,
    };
    await this.transporter.sendMail(mailOptions);
  }
}
