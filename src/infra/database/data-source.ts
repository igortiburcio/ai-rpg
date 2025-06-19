import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: true,
  logging: false,
  entities: ['src/infra/database/entities/*.{js,ts}'],
  migrations: ['src/infra/database/migrations/*.{js,ts}'],
  subscribers: [],
});
