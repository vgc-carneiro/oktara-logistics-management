import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

export class DatabaseConfiguration implements TypeOrmOptionsFactory {
  constructor() {}

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      schema: process.env.DATABASE_SCHEMA,
      entities: [process.env.PATH_ENTITIES],
      synchronize: false,

      migrations: [process.env.MIGRATION_PATH],
      migrationsTableName: process.env.MIGRATION_TABLE,
    };
  }
}
