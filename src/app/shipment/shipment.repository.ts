import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Shipment } from './shipment';
import { ShipmentEntity } from './shipment.entity';

@Injectable()
export class ShipmentRepository {
  constructor(
    @InjectRepository(ShipmentEntity)
    private repository: Repository<ShipmentEntity>,
  ) {}

  async save(domain: Shipment): Promise<ShipmentEntity> {
    const model = this.repository.create();
    model.fromDomain(domain);
    return await this.repository.save(model);
  }

  async get(id: string): Promise<ShipmentEntity> {
    return this.repository.findOne({
      relations: ['packages'],
      where: { id },
    });
  }

  async countAvailable(): Promise<number> {
    return this.repository.count({
      where: [
        { start_route: IsNull() },
        { estimated_route: IsNull() },
        { finished_route: IsNull() },
      ],
    });
  }
}
