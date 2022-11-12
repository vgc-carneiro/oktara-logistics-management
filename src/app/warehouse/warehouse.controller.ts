import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { ExceptionControllerHandler } from 'src/extensions/exception.controller.handler';

@ApiTags('Warehouses')
@Controller('api/warehouses')
export class WarehouseController extends ExceptionControllerHandler {
  constructor() {
    super();
  }

  @ApiOperation({
    summary: 'List all warehouses',
    description: 'List all warehouses avaiable on the system.',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Return a list of all the warehouses avaiable on the system',
  })
  @ApiBadRequestResponse({
    status: 404,
    description: 'Not found any warehouse.',
  })
  @Get()
  async list(@Res({ passthrough: true }) res: Response) {
    try {
      return [];
    } catch (error) {
      this.handleResponseError(error, res);
    }
  }
}
