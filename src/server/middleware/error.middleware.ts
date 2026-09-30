import { DatabaseService } from '../database/database.service';
import { NextFunction, Request, Response } from 'express';
import ApiMiddleware from './api.middleware';

export default class ErrorMiddleware extends ApiMiddleware {

  constructor(database: DatabaseService) {
    super(database);

    this.app.use(this.notFoundHandler());

    this.app.use(this.errorHandler());
  }

  protected notFoundHandler() {
    return (req: Request, res: Response, next: NextFunction) => {
      res.status(404).send('Not found.');
    };
  }

  protected errorHandler() {
    return (err: Error, req: Request, res: Response, next: NextFunction) => {

      console.error(`Express error - endpoint: ${req.originalUrl} - Error: ${err}`);

      res.status(500).send('Unexpected server error.');
    };
  }
}