import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config({ path: __dirname + '/../../../.env' });

// Used for migrations!!
export const DatabaseMigrations = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || '',
  port: Number(process.env.DB_PORT) || 0,
  username: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || '',
  entities: [__dirname + '/entities/*.entity.js'],
  migrations: [__dirname + '/migrations/*.js']
});
