import { PackageService } from './package.service';
import { PackageController } from './package.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [PackageController],
  providers: [PackageService],
})
export class PackageModule {}
