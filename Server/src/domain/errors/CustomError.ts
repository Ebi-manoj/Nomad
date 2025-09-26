import { ErrorMessages } from '../enums/ErrorMessage';
import { HttpStatus } from '../enums/HttpStatusCode';

export class CustomError extends Error {
  public readonly statusCode: number;
  constructor(statusCode: number = 500, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class UserAlreadyExist extends CustomError {
  constructor(message: string = ErrorMessages.USER_ALREADY_EXISTS) {
    super(HttpStatus.CONFLICT, message);
  }
}
