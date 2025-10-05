import { AdminLoginUseCase } from '../../../application/usecases/Admin/AdminLoginUseCase';
import { AdminAuthController } from '../../../interfaces/http/controllers/adminAuth.controller';
import { IAdminAuthController } from '../../../interfaces/http/controllers/IAdminAuthController';
import { BcryptService } from '../../providers/passwordHasher';
import { TokenGenerator } from '../../providers/tokenGenrator';
import { AdminRepository } from '../../repositories/AdminRepository';
import { env } from '../../utils/env';

export function adminAuthComposer(): IAdminAuthController {
  const adminRepository = new AdminRepository();
  const tokenGenerator = new TokenGenerator(env.JWT_SECERT);
  const passwordHasher = new BcryptService();

  const adminLoginUseCase = new AdminLoginUseCase(
    adminRepository,
    tokenGenerator,
    passwordHasher
  );

  return new AdminAuthController(adminLoginUseCase);
}
