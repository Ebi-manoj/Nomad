import { NextFunction, Request, Response } from 'express';
import {
  CustomError,
  Unauthorized,
  UserIsBlocked,
  UserNotFound,
} from '../../../domain/errors/CustomError';
import { TokenGenerator } from '../../../infra/providers/tokenGenrator';
import { env } from '../../../infra/utils/env';
import { IUserRepository } from '../../../application/repositories/IUserRepository';
import { MongoUserRepository } from '../../../infra/repositories/UserRepository';
import { WinstonLogger } from '../../../infra/providers/winstonLogger';

const logger = new WinstonLogger();

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
      };
    }
  }
}

const tokenVerifier = new TokenGenerator(env.JWT_SECERT);

export const createAuthMiddleware = (userRepository: IUserRepository) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token || !token?.startsWith('Bearer')) throw new Unauthorized();
    try {
      const decoded = tokenVerifier.verifyToken<{
        userId: string;
        role: string;
      }>(token.split(' ')[1]);
      if (!decoded) throw new Unauthorized();
      req.user = {
        id: decoded.userId,
        role: decoded.role || 'user',
      };
      const user = await userRepository.findById(decoded.userId);
      if (!user) throw new UserNotFound();
      if (user.getIsBlocked()) {
        res.clearCookie('refreshToken', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
        });
        throw new UserIsBlocked();
      }
      next();
    } catch (error) {
      logger.error('Error in auth middleware', { error });
      if (error instanceof CustomError) throw error;
      throw new CustomError(403, 'Invalid or expired token');
    }
  };
};
const userRepo = new MongoUserRepository();
export const authMiddleware = createAuthMiddleware(userRepo);
