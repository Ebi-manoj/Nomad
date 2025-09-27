export interface ITOkenGenerator {
  generateToken(payload: object, expiresIn: string): string;
}
