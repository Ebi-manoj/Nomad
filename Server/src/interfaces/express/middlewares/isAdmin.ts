import { NextFunction, Request, Response } from 'express';
import { ADMIN } from '../../../domain/enums/Constants';
import { CustomError } from '../../../domain/errors/CustomError';

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const role = req.user?.role;
  if (role !== ADMIN) throw new CustomError(403, 'Access Denied admins only');
  next();
};
