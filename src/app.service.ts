import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { WarehouseSeeder } from './app/warehouse/warehouse.seeder';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(private readonly seeder: WarehouseSeeder) {}
  async onApplicationBootstrap() {
    if (
      process.env.NODE_ENV === 'development' &&
      process.env.ENABLE_SEED === 'true'
    ) {
      await this.seeder.seed();
    }
  }
}
