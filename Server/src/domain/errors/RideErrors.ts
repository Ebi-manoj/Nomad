import { ErrorMessages } from '../enums/ErrorMessage';
import { HttpStatus } from '../enums/HttpStatusCode';
import { CustomError } from './CustomError';

export class RideNotFound extends CustomError {
  constructor(message = ErrorMessages.RIDE_NOT_FOUND) {
    super(HttpStatus.NOT_FOUND, message);
  }
}

export class RideLocationNotFound extends CustomError {
  constructor(message = 'Ride Location not found') {
    super(HttpStatus.NOT_FOUND, message);
  }
}
