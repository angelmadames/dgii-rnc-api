import { dirname } from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';

export const DataSourceConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [`${dirname}/../**/*.entity.{js, ts}`],
  migrations: [`${dirname}/../**/migrations/*.{js, ts}`],
};

export const TypeORMConfig: TypeOrmModuleOptions = {
  ...DataSourceConfig,
  retryAttempts: 10,
  retryDelay: 60,
  autoLoadEntities: true,
};

export default new DataSource(DataSourceConfig);
