import { ErrorMessages } from '../enums/ErrorMessage';
import { HttpStatus } from '../enums/HttpStatusCode';
import { CustomError } from './CustomError';

export class JoinRequestNotFound extends CustomError {
  constructor(message = ErrorMessages.JOINREQUEST_NOT_FOUND) {
    super(HttpStatus.NOT_FOUND, message);
  }
}

export class NotAuthorizedToAccept extends CustomError {
  constructor(message = ErrorMessages.ACCESS_DENIED) {
    super(HttpStatus.BAD_REQUEST, message);
  }
}

export class InvalidJoinRequestStatus extends CustomError {
  constructor(message = 'Dont have any pending requests') {
    super(HttpStatus.BAD_REQUEST, message);
  }
}
