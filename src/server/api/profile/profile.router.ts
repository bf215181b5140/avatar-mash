import { DatabaseService } from '../../database/database.service';
import { NextFunction, Request, Response } from 'express';
import { BaseRouter } from '../base.router';

export class ProfileRouter extends BaseRouter {

  constructor(private database: DatabaseService) {
    super();

    this.route.get('/', this.get());
  }

  get() {
    return async (req: Request, res: Response, next: NextFunction) => {

      await this.database.transaction(async em => {
      });

      res.send('Profile router.');
    };
  }

}