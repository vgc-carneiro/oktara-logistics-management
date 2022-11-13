import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ExceptionControllerHandler } from '../../extensions/exception.controller.handler';
import { isGuidValid } from '../../utils/guid.utils';
import { ShipmentDTO } from './dto/shipment.dto';
import { ShipmentService } from './shipment.service';

@ApiTags('Shipment')
@Controller('api/shipments')
export class ShipmentController extends ExceptionControllerHandler {
  constructor(private readonly service: ShipmentService) {
    super();
  }

  @ApiOperation({
    summary: 'Create a Shipment',
    description: 'Create a Shipment',
  })
  @ApiCreatedResponse({
    status: 201,
    description:
      'Indicates that resource was created. It will return a Header Location with the GET informations.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Request Malformed',
  })
  @Post()
  async create(@Body() shipment: ShipmentDTO, @Res({ passthrough: true }) res) {
    try {
      const result = await this.service.createShipment(shipment);
      res.status(HttpStatus.CREATED).set({ location: result.id });
    } catch (error) {
      this.handleResponseError(error);
    }
  }

  @ApiOperation({
    summary: 'Retrieve a Shipment',
    description: 'Retrive a specific Shipment',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Return a Shipment Object',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Shipment not found.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Request Malformed',
  })
  @Get(':id')
  async get(@Param('id') id: string) {
    try {
      if (!isGuidValid(id))
        throw new BadRequestException('ID must be an UUID identifier.');
      return this.service.get(id);
    } catch (error) {
      this.handleResponseError(error);
    }
  }

  @ApiOperation({
    summary: 'Put a Package on the Shipment',
    description: 'Put a Package on the Shipment',
  })
  @ApiOkResponse({
    status: 200,
    description:
      'Put a Package on the Shipment and return a Shipment Object with an array of Packages',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Shipment not found or Package not found.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Request Malformed',
  })
  @Patch(':id/packages/:packageID')
  async addPackage(
    @Param('id') id: string,
    @Param('packageID') packageID: string,
  ) {
    if (!isGuidValid(id))
      throw new BadRequestException('ID must be an UUID identifier.');
    if (!isGuidValid(packageID))
      throw new BadRequestException('PackageID must be an UUID identifier.');
    return this.service.addPackage(id, packageID);
  }
}
