import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PackageRepository } from '../package/package.repository';
import { ShipmentDTO } from './dto/shipment.dto';
import { Shipment } from './shipment';
import { ShipmentEntity } from './shipment.entity';
import { ShipmentRepository } from './shipment.repository';

@Injectable()
export class ShipmentService {
  constructor(
    private readonly repository: ShipmentRepository,
    private readonly packageRepository: PackageRepository,
  ) {}

  async createShipment(dto: ShipmentDTO): Promise<ShipmentEntity> {
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

  async addPackage(id: string, packageID: string): Promise<ShipmentEntity> {
    const shipment = await this.repository.get(id);
    if (!shipment) throw new NotFoundException('No Shipment were found.');
    const pakage = await this.packageRepository.get(packageID);
    if (!pakage) throw new NotFoundException('No Package were found.');

    return null;
  }
}
