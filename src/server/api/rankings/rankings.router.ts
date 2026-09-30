import { DatabaseService } from '../../database/database.service';
import { NextFunction, Request, Response } from 'express';
import { BaseRouter } from '../base.router';
import { Avatar } from '../../database/entities/avatar.entity';
import { z } from 'zod/v4';
import { AvatarSchema } from '../../../shared/schemas/avatar';

export class RankingsRouter extends BaseRouter {

  constructor(private database: DatabaseService) {
    super();

    this.route.get('/', this.get());
  }

  get() {
    return async (req: Request, res: Response, next: NextFunction) => {
      const result = await this.database.transaction(async em => {
        return await em.createQueryBuilder<Avatar>(Avatar, 'avatar')
          .where('avatar.approved = 1')
          .orderBy('avatar.elo', 'DESC')
          .take(30)
          .getMany();
      });

      res.send(z.array(AvatarSchema).max(30).parse(result));
    };
  }

}