import { ErrorMessages } from '../enums/ErrorMessage';
import { HttpStatus } from '../enums/HttpStatusCode';
import { CustomError } from './CustomError';

export class InvalidFileFormat extends CustomError {
  constructor(message = ErrorMessages.INVALID_FILE_FORMAT) {
    super(HttpStatus.BAD_REQUEST, message);
  }
}
export class InvalidFolderType extends CustomError {
  constructor(message = ErrorMessages.INVALID_FOLDER_TYPE) {
    super(HttpStatus.BAD_REQUEST, message);
  }
}
