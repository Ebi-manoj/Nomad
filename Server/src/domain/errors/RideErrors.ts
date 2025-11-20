import { ErrorMessages } from '../enums/ErrorMessage';
import { HttpStatus } from '../enums/HttpStatusCode';
import { CustomError } from './CustomError';

export class RideNotFound extends CustomError {
  constructor(message = ErrorMessages.RIDE_NOT_FOUND) {
    super(HttpStatus.NOT_FOUND, message);
  }
}
export class RideIsNotActiveStatus extends CustomError {
  constructor(message = 'Ride is not in active status') {
    super(HttpStatus.BAD_REQUEST, message);
  }
}

export class RideLocationNotFound extends CustomError {
  constructor(message = 'Ride Location not found') {
    super(HttpStatus.NOT_FOUND, message);
  }
}
export class RideHavePendingTasks extends CustomError {
  constructor(message = 'Ride have pending tasks') {
    super(HttpStatus.NOT_FOUND, message);
  }
}
