import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '../../../domain/enums/HttpStatusCode';
import { CustomError } from '../../../domain/errors/CustomError';
import { ApiDTO } from '../../http/helpers/implementation/apiDTO';
import { ZodError } from 'zod';
import { WinstonLogger } from '../../../infra/providers/winstonLogger';

const logger = new WinstonLogger();

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
  } else if (err instanceof ZodError) {
    message = err.issues[0].message;
    statusCode = HttpStatus.BAD_REQUEST;
  }
  logger.error('Request failed', {
    name: (err as Error).name,
    message: (err as Error).message,
    stack: (err as Error).stack,
    method: req.method,
    path: req.path,
    statusCode,
  });
  const response = ApiDTO.error(message);
  res.status(statusCode).json(response);
}
