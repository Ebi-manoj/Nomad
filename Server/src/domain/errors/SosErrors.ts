import { HttpStatus } from '../enums/HttpStatusCode';
import { CustomError } from './CustomError';

export class NotValidStatusToTrigger extends CustomError {
  constructor(message = 'Cannot trigger SOS in this status') {
    super(HttpStatus.BAD_REQUEST, message);
  }
}
