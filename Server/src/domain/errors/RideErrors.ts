import { ErrorMessages } from '../enums/ErrorMessage';
import { HttpStatus } from '../enums/HttpStatusCode';
import { CustomError } from './CustomError';

export class RideNotFound extends CustomError {
  constructor(message = ErrorMessages.RIDE_NOT_FOUND) {
    super(HttpStatus.NOT_FOUND, message);
  }
}
