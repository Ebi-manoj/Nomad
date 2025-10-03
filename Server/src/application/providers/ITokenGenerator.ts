export interface ITOkenGenerator {
  generateToken(payload: object, expiresIn: string): string;
  verifyToken<T>(token: string): T | null;
}
