import { ErrorMessages } from '../enums/ErrorMessage';
import { HttpStatus } from '../enums/HttpStatusCode';
import { CustomError } from './CustomError';

export class InvalidFileFormat extends CustomError {
  constructor(message = ErrorMessages.INVALID_FILE_FORMAT) {
    super(HttpStatus.BAD_REQUEST, message);
  }
}
