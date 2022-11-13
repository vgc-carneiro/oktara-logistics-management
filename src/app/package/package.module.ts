import { PackageService } from './package.service';
import { PackageController } from './package.controller';
import { Module } from '@nestjs/common';
import { PackageRepository } from './package.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PackageEntity } from './package.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PackageEntity])],
  controllers: [PackageController],
  providers: [PackageService, PackageRepository],
  exports: [PackageService, PackageRepository],
})
export class PackageModule {}
