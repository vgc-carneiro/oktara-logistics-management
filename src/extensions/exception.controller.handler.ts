import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';

export class ExceptionControllerHandler {
  handleResponseError(e: Error, response: Response) {
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

    response.status(statusCode).json({ error: statusMsg });
  }
}
