import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../../../domain/errors/CustomError';
import { TokenGenerator } from '../../../infra/providers/tokenGenrator';
import { env } from '../../../infra/utils/env';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role?: string;
      };
    }
  }
}

const tokenVerifier = new TokenGenerator(env.JWT_SECERT);
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  if (!token || !token?.startsWith('Bearer'))
    throw new CustomError(401, 'Unauthorized');
  try {
    const decoded = tokenVerifier.verifyToken<{ userId: string; role: string }>(
      token.split(' ')[1]
    );
    if (!decoded) throw new CustomError(401, 'Unauthorized');
    req.user = {
      id: decoded.userId,
      role: decoded.role || 'user',
    };
    next();
  } catch (error) {
    throw new CustomError(403, 'Invalid or expired token');
  }
};
