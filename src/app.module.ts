import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseConfiguration } from './infrastructure/database/database.service';

@Module({
  imports: [TypeOrmModule.forRootAsync({ useClass: DatabaseConfiguration })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
