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
import { PackageDTO } from './dto/package.dto';
import { PackageService } from './package.service';
import { isGuidValid } from '../../utils/guid.utils';

@ApiTags('Packages')
@Controller('api/packages')
export class PackageController extends ExceptionControllerHandler {
  constructor(private readonly service: PackageService) {
    super();
  }

  @ApiOperation({
    summary: 'List all packages in the system',
    description: 'List all packages available on the system.',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Return a list of all the packages available on the system',
  })
  @ApiBadRequestResponse({
    status: 404,
    description: 'Not found any packages.',
  })
  @Get()
  async list() {
    try {
      return await this.service.list();
    } catch (error) {
      this.handleResponseError(error);
    }
  }

  @ApiOperation({
    summary: 'Create a Package',
    description: 'Create a Package',
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
  async create(@Body() pakage: PackageDTO, @Res({ passthrough: true }) res) {
    try {
      const result = await this.service.createPackage(pakage);
      res
        .status(HttpStatus.CREATED)
        .set({ location: result.id })
        .json({ id: result.id });
    } catch (error) {
      this.handleResponseError(error);
    }
  }

  @ApiOperation({
    summary: 'Retrieve a Package',
    description: 'Retrive a specific Package',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Return a Package Object',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Package not found.',
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
    summary: 'Assign a Location to a Package',
    description: 'Assign a Location to a Package',
  })
  @ApiOkResponse({
    status: 200,
    description:
      'Assign a Location and return a Package Object with a Location',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Package not found or Location not found.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Request Malformed',
  })
  @Patch(':id/location/:locationID')
  async assignLocation(
    @Param('id') id: string,
    @Param('locationID') locationID: string,
  ) {
    try {
      if (!isGuidValid(id))
        throw new BadRequestException('ID must be an UUID identifier.');
      if (!isGuidValid(locationID))
        throw new BadRequestException('LocationID must be an UUID identifier.');
      return this.service.assignLocation(id, locationID);
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
      'Put a Package on the Shipment and return a Package Object with a Shipment',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Package not found or Shipment not found.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Request Malformed',
  })
  @Patch(':id/shipment/:shipmentID')
  async addShipment(
    @Param('id') id: string,
    @Param('shipmentID') shipmentID: string,
  ) {
    try {
      if (!isGuidValid(id))
        throw new BadRequestException('ID must be an UUID identifier.');
      if (!isGuidValid(shipmentID))
        throw new BadRequestException('ShipmentID must be an UUID identifier.');
      return this.service.addShipment(id, shipmentID);
    } catch (error) {
      this.handleResponseError(error);
    }
  }

  @ApiOperation({
    summary: 'Mark a package as "Delivered"',
    description: 'Finishing the delivery of a Package',
  })
  @ApiOkResponse({
    status: 200,
    description:
      'Mark a package as delivered. Return a Package Object with Shipment inside.',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Package not found.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Request Malformed',
  })
  @Patch('deliver/:id')
  async deliver(@Param('id') id: string) {
    try {
      if (!isGuidValid(id))
        throw new BadRequestException('ID must be an UUID identifier.');
      return this.service.deliver(id);
    } catch (error) {
      this.handleResponseError(error);
    }
  }
}
