import { PackageService } from './package.service';
import { PackageController } from './package.controller';
import { Module } from '@nestjs/common';
import { PackageRepository } from './package.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PackageEntity } from './package.entity';
import { WarehouseModule } from '../warehouse/warehouse.module';

@Module({
  imports: [TypeOrmModule.forFeature([PackageEntity]), WarehouseModule],
  controllers: [PackageController],
  providers: [PackageService, PackageRepository],
  exports: [PackageService, PackageRepository],
})
export class PackageModule {}
