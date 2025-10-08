import bcrypt from 'bcrypt';
import { PasswordHasher } from '../../application/providers/IpasswordHasher';

export class BcryptService implements PasswordHasher {
  private readonly saltRounds = 10;
  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }
  async compare(password: string, oldPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, oldPassword);
  }
}
