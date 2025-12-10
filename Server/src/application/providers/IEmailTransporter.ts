export interface IEmailTransporter {
  sendEmail(email: string, data: string): Promise<void>;
  sendCustomEmail(
    email: string,
    subject: string,
    text: string,
    html?: string
  ): Promise<void>;
}
