import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config({ path: __dirname + '/../../../.env' });

const creationDatabaseSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || '',
  port: Number(process.env.DB_PORT) || 0,
  username: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || '',
  entities: [__dirname + '/entities/*.entity.ts'],
  synchronize: true,
});

creationDatabaseSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
