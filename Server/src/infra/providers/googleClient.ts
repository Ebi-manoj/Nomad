import { OAuth2Client } from 'google-auth-library';
import { IGoogleClient } from '../../application/providers/IGoogleClient';
import { env } from '../utils/env';
import { InvalidToken } from '../../domain/errors/CustomError';

export class GoogleClient implements IGoogleClient {
  private readonly client;
  constructor() {
    this.client = new OAuth2Client(
      env.GOOGLE_CLIENT_ID,
      env.GOOGLE_CLIENT_SECRET,
      'postmessage'
    );
  }
  async getAuthDetails(
    code: string
  ): Promise<{ email: string; name: string } | null> {
    try {
      const { tokens } = await this.client.getToken(code);
      if (!tokens?.id_token) throw new InvalidToken();
      const ticket = await this.client.verifyIdToken({
        idToken: tokens.id_token,
        audience: env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      if (!payload) throw new InvalidToken();

      const { email, name } = payload;
      if (!email || !name) throw new InvalidToken();
      return { email, name };
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
