import { BaseRouter } from '../base.router';
import { DatabaseService } from '../../database/database.service';
import { NextFunction, Request, Response } from 'express';
import { User } from '../../database/entities/user.entity';
import { UserSchema } from '../../../shared/schemas/user';

export class UserRouter extends BaseRouter {

  constructor(private database: DatabaseService) {
    super();

    this.route.get('/', this.get());
  }

  get() {
    return async (req: Request, res: Response, next: NextFunction) => {

      // todo check/require user to exist
      if (!req.user) res.send(null);

      const result = await this.database.createQueryBuilder<User>(User, 'user')
        .leftJoinAndSelect('user.avatars', 'avatar')
        .where('user.id = :id', { id: (req.user as any).id })
        .getOne();

      res.send(UserSchema.parse(result));
    };
  }

}