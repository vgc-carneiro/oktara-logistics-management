import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './location';
import { LocationEntity } from './location.entity';

@Injectable()
export class LocationRepository {
  private readonly logger = new Logger('WarehouseRepository');
  constructor(
    @InjectRepository(LocationEntity)
    private repository: Repository<LocationEntity>,
  ) {}

  async save(domain: Location): Promise<LocationEntity> {
    const model = this.repository.create();
    model.fromDomain(domain);

    await this.repository.save(model);
    return null;
  }

  async get(id: string): Promise<LocationEntity> {
    return this.repository.findOne({
      where: { id },
      relations: ['package'],
    });
  }

  async update(entity: LocationEntity): Promise<LocationEntity> {
    return await this.repository.save(entity);
  }
}
