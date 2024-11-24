import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['**/modules/**/*.entity.{js,ts}'],
  migrations: [__dirname + '/seeds/*.{js,ts}'],
  synchronize: false,
  migrationsTableName: 'seed_migrations',
});
