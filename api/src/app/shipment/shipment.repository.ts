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

  async find(): Promise<ShipmentEntity[]> {
    return await this.repository.find({
      relations: ['packages'],
    });
  }

  async save(domain: Shipment): Promise<ShipmentEntity> {
    const model = this.repository.create();
    model.fromDomain(domain);
    return await this.repository.save(model);
  }

  async get(id: string, needRelation: boolean = true): Promise<ShipmentEntity> {
    const relations = needRelation ? ['packages'] : [];
    return this.repository.findOne({
      relations: relations,
      where: { id },
    });
  }

  async update(entity: ShipmentEntity): Promise<ShipmentEntity> {
    return await this.repository.save(entity);
  }

  async countAvailable(): Promise<number> {
    return this.repository.count({
      where: [{ finished_route: IsNull() }],
    });
  }
}
