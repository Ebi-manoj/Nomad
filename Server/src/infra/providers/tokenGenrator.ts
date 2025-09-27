import { ITOkenGenerator } from '../../application/providers/ITokenGenerator';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';

export class TokenGenerator implements ITOkenGenerator {
  constructor(private readonly secret: Secret) {}
  generateToken(payload: object, expiresIn: string): string {
    return jwt.sign(payload, this.secret, { expiresIn } as SignOptions);
  }
}
