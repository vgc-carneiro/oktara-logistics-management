import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ExceptionControllerHandler } from '../../extensions/exception.controller.handler';
import { PackageDTO } from './dto/package.dto';
import { PackageService } from './package.service';

@ApiTags('Packages')
@Controller('api/packages')
export class PackageController extends ExceptionControllerHandler {
  constructor(private readonly service: PackageService) {
    super();
  }

  @ApiOperation({
    summary: 'Create a Package',
    description: 'Create a Package',
  })
  @ApiCreatedResponse({
    status: 201,
    description:
      'Indicates that resource was created. It will return a Header Location with the GET informations.',
    type: PackageDTO,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Request Malformed',
  })
  @Post()
  async create(@Body() pakage: PackageDTO, @Res({ passthrough: true }) res) {
    try {
      const result = await this.service.createPackage(pakage);
      res.status(HttpStatus.CREATED).set({ location: result.id });
    } catch (error) {
      this.handleResponseError(error);
    }
  }
}
