import { WarehouseService } from './warehouse.service';
import { Module } from '@nestjs/common';
import { WarehouseController } from './warehouse.controller';
import { WarehouseRepository } from './warehouse.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WarehouseEntity } from './warehouse.entity';
import { LocationEntity } from './location/location.entity';
import { LocationRepository } from './location/location.repository';
import { WarehouseSeeder } from './warehouse.seeder';

@Module({
  imports: [TypeOrmModule.forFeature([WarehouseEntity, LocationEntity])],
  controllers: [WarehouseController],
  providers: [
    LocationRepository,
    WarehouseSeeder,
    WarehouseService,
    WarehouseRepository,
  ],
  exports: [
    LocationRepository,
    WarehouseSeeder,
    WarehouseService,
    WarehouseRepository,
  ],
})
export class WarehouseModule {}
