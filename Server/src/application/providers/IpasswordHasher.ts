export interface PasswordHasher {
  hash(password: string): Promise<string>;
  compare(password: string, oldPassword: string): Promise<boolean>;
}
