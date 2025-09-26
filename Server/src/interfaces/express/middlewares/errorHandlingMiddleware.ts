import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '../../../domain/enums/HttpStatusCode';
import { CustomError } from '../../../domain/errors/CustomError';
import { ApiDTO } from '../../http/helpers/implementation/apiDTO';

export function errorHandling(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let message = 'Something went Wrong';
  let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

  if (err instanceof CustomError) {
    message = err.message;
    statusCode = err.statusCode;
  }
  console.error(err);
  const response = ApiDTO.error(message);
  res.status(statusCode).json(response);
}
