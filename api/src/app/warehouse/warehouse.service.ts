import { Injectable, NotFoundException } from '@nestjs/common';
import { WarehouseEntity } from './warehouse.entity';
import { WarehouseRepository } from './warehouse.repository';

@Injectable()
export class WarehouseService {
  constructor(private readonly repository: WarehouseRepository) {}
  async list(): Promise<WarehouseEntity[]> {
    const warehouses = await this.repository.find();
    if (warehouses.length === 0)
      throw new NotFoundException('No Warehouses were found.');
    return warehouses;
  }
}
