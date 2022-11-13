import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EStatusPackage } from '../package/status.enum';
import { ShipmentDTO } from './dto/shipment.dto';
import { Shipment } from './shipment';
import { ShipmentEntity } from './shipment.entity';
import { ShipmentRepository } from './shipment.repository';

@Injectable()
export class ShipmentService {
  constructor(private readonly repository: ShipmentRepository) {}

  async createShipment(dto: ShipmentDTO): Promise<ShipmentEntity> {
    const available = await this.repository.countAvailable();

    if (available > 0)
      throw new BadRequestException(
        'There is an active shipment! Wait until it finishes.',
      );

    const shipmentDomain = new Shipment(dto);
    try {
      return this.repository.save(shipmentDomain);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async get(id: string): Promise<ShipmentEntity> {
    const shipment = await this.repository.get(id);
    if (!shipment) throw new NotFoundException('No shipment were found.');
    return shipment;
  }

  async startRoute(id: string): Promise<ShipmentEntity> {
    const shipment = await this.repository.get(id);
    if (!shipment) throw new NotFoundException('No shipment were found.');

    if (shipment.packages.length === 0)
      throw new BadRequestException('No packages inside this Shipment.');

    if (!shipment.isAvailableToPackages())
      throw new BadRequestException(
        'This shipment has already started its deliveries.',
      );

    shipment.packages.forEach((pakage) => {
      pakage.status_id = EStatusPackage.TRANSIT;
    });

    shipment.start_route = new Date();
    return await this.repository.update(shipment);
  }
}
