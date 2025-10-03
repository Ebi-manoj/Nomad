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

export class UserNotFound extends CustomError {
  constructor(message: string = ErrorMessages.USER_NOT_FOUND) {
    super(HttpStatus.NOT_FOUND, message);
  }
}

export class InvalidCredindatials extends CustomError {
  constructor(message: string = ErrorMessages.INVALID_CREDINTIALS) {
    super(HttpStatus.UNAUTHORIZED, message);
  }
}

export class InvalidInputData extends CustomError {
  constructor(message: string = ErrorMessages.INVALID_INPUT) {
    super(HttpStatus.BAD_REQUEST, message);
  }
}

export class InvalidOTP extends CustomError {
  constructor(message: string = ErrorMessages.INVALID_OTP) {
    super(HttpStatus.BAD_REQUEST, message);
  }
}

export class InvalidToken extends CustomError {
  constructor(message: string = ErrorMessages.INVALID_TOKEN) {
    super(HttpStatus.BAD_REQUEST, message);
  }
}
