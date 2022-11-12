import { DataSource, DataSourceOptions } from 'typeorm';
import { DatabaseConfiguration } from './database.service';

export const connectionSource = new DataSource(
  new DatabaseConfiguration().createTypeOrmOptions() as DataSourceOptions,
);
