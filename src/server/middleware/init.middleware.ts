import express, { Application } from 'express';
import { DatabaseService } from '../database/database.service';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { SRC_DIR } from '../const';

export default class InitMiddleware {
  public app: Application;

  constructor(protected database: DatabaseService) {
    this.app = express();

    // Development logging
    if (process.env.NODE_ENV === 'development') this.app.use(morgan('dev'));

    this.app.use(helmet());

    // Auto parse application/json data
    this.app.use(express.json());

    // Auto parse text/plain data
    // this.app.use(express.text());

    // Auto parse application/x-www-form-urlencoded data
    // this.app.use(express.urlencoded({ extended: false }));

    // Serve static files
    this.app.use(express.static(path.join(SRC_DIR, '/website')));
  }
}