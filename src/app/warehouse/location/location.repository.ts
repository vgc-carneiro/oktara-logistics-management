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
}
