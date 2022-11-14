import { HttpStatus } from '@nestjs/common';

export class ResponseMock {
  headers = [];
  code = 0;

  status(status: HttpStatus) {
    this.code = status;
    return this;
  }

  set(header) {
    this.headers.push(header);
  }
}
