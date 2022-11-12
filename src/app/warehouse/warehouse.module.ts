import { Module } from '@nestjs/common';
import { WarehouseController } from './warehouse.controller';

@Module({
  imports: [],
  controllers: [WarehouseController],
  providers: [],
})
export class WarehouseModule {}
