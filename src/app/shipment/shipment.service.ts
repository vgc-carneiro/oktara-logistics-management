import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
}
