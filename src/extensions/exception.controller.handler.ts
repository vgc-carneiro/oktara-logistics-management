import { HttpException, HttpStatus } from '@nestjs/common';

export class ExceptionControllerHandler {
  handleResponseError(e: Error) {
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let statusMsg = e.message;

    switch (e.name) {
      case 'NotFoundException':
        statusCode = HttpStatus.NOT_FOUND;
        break;
      case 'BadRequestException':
        statusCode = HttpStatus.BAD_REQUEST;
        break;
    }

    throw new HttpException(statusMsg, statusCode);
  }
}
