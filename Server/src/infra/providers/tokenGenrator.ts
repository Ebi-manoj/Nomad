import { decode } from 'punycode';
import { ITOkenGenerator } from '../../application/providers/ITokenGenerator';
import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';

export class TokenGenerator implements ITOkenGenerator {
  constructor(private readonly secret: Secret) {}
  generateToken(payload: object, expiresIn: string): string {
    return jwt.sign(payload, this.secret, { expiresIn } as SignOptions);
  }
  verifyToken<T>(token: string): T | null {
    try {
      const decoded = jwt.verify(token, this.secret) as T;
      return decoded;
    } catch (error) {
      return null;
    }
  }
}
