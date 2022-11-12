import { WarehouseService } from './warehouse.service';
import { Module } from '@nestjs/common';
import { WarehouseController } from './warehouse.controller';
import { WarehouseRepository } from './warehouse.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WarehouseEntity } from './warehouse.entity';
import { LocationEntity } from './location/location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WarehouseEntity, LocationEntity])],
  controllers: [WarehouseController],
  providers: [WarehouseService, WarehouseRepository],
  exports: [WarehouseService, WarehouseRepository],
})
export class WarehouseModule {}
