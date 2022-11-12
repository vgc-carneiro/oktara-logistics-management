import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthController } from './health/health.controller';
import { DatabaseConfiguration } from './infrastructure/database/database.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useClass: DatabaseConfiguration }),
    TerminusModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
