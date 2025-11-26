import { ErrorMessages } from '../enums/ErrorMessage';
import { HttpStatus } from '../enums/HttpStatusCode';
import { CustomError } from './CustomError';

export class SosLogNotFound extends CustomError {
  constructor(message = 'SoS Log not Found') {
    super(HttpStatus.NOT_FOUND, message);
  }
}

export class NotValidStatusToTrigger extends CustomError {
  constructor(message = 'Cannot trigger SOS in this status') {
    super(HttpStatus.BAD_REQUEST, message);
  }
}
