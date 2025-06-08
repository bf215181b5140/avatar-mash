import AuthenticationMiddleware from './authentication.middleware';
import { DatabaseService } from '../database/database.service';
import { Router } from 'express';
import { MatchRouter } from '../api/match/match.router';
import { RankingsRouter } from '../api/rankings/rankings.router';
import { ProfileRouter } from '../api/profile/profile.router';
import { UserRouter } from '../api/user/user.router';

export default class ApiMiddleware extends AuthenticationMiddleware {

  constructor(database: DatabaseService) {
    super(database);

    const apiRouter = Router();

    // API routes
    apiRouter.use('/match', new MatchRouter(this.database).router());
    apiRouter.use('/rankings', new RankingsRouter(this.database).router());
    apiRouter.use('/profile', this.authenticate(), new ProfileRouter(this.database).router());
    apiRouter.use('/user', new UserRouter(this.database).router());

    // API routes
    this.app.use('/api', apiRouter);
  }
}