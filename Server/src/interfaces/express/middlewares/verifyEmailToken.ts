import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../../../domain/errors/CustomError';
import { HttpStatus } from '../../../domain/enums/HttpStatusCode';
import jwt from 'jsonwebtoken';
import { env } from '../../../infra/utils/env';

export function verifyEmailToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { verificationToken } = req.body;
  if (!verificationToken)
    throw new CustomError(
      HttpStatus.UNAUTHORIZED,
      'Verification token is missing'
    );
  try {
    const payload = jwt.verify(verificationToken, env.JWT_SECERT) as {
      email: string;
    };
    req.body.email = payload.email;
    next();
  } catch (error) {
    throw new CustomError(
      HttpStatus.UNAUTHORIZED,
      'Invalid or expired verification token'
    );
  }
}
