import { WarehouseModule } from './app/warehouse/warehouse.module';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthController } from './health/health.controller';
import { DatabaseConfiguration } from './infrastructure/database/database.service';

@Module({
  imports: [
    TerminusModule,
    TypeOrmModule.forRootAsync({ useClass: DatabaseConfiguration }),
    WarehouseModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
