import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WarehouseEntity } from './warehouse.entity';

@Injectable()
export class WarehouseRepository {
  private readonly logger = new Logger('WarehouseRepository');
  constructor(
    @InjectRepository(WarehouseEntity)
    private repository: Repository<WarehouseEntity>,
  ) {}

  async find(): Promise<WarehouseEntity[]> {
    return await this.repository.find();
  }
}
