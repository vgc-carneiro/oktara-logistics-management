import { ShipmentController } from './shipment.controller';
import { ShipmentService } from './shipment.service';
import { Module } from '@nestjs/common';
import { ShipmentRepository } from './shipment.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShipmentEntity } from './shipment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShipmentEntity])],
  controllers: [ShipmentController],
  providers: [ShipmentService, ShipmentRepository],
  exports: [ShipmentService, ShipmentRepository],
})
export class ShipmentModule {}
