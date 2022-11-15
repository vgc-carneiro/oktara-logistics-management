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
    summary: 'List all shipments in the system',
    description: 'List all shipments available on the system.',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Return a list of all the shipments available on the system',
  })
  @ApiBadRequestResponse({
    status: 404,
    description: 'Not found any shipment.',
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
    summary: 'Start Delivering.',
    description:
      'This endpoint will start the delivery. All packages will be updated with "IN TRANSIT" status and we will save the date of starting route.',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Return a Shipment Object with all its packages.',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Shipment not found.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Request Malformed',
  })
  @Patch('/start-delivering/:id')
  async startDelivering(@Param('id') id: string) {
    try {
      if (!isGuidValid(id))
        throw new BadRequestException('ID must be an UUID identifier.');
      return await this.service.startRoute(id);
    } catch (error) {
      this.handleResponseError(error);
    }
  }
}
