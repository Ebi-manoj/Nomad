export interface IEmailTransporter {
  sendEmail(email: string, data: string): Promise<void>;
}
