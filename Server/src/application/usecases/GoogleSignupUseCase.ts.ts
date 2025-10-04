import { IGoogleClient } from '../providers/IGoogleClient';

export class GoogleSignupUseCase {
  constructor(private readonly authClient: IGoogleClient) {}

  async execute(data: { code: string }) {
    console.log(data);
    const payload = await this.authClient.getAuthDetails(data.code);
    console.log(payload);
  }
}
