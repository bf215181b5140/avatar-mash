import express, { Application, NextFunction, Request, Response, Router } from 'express';
import helmet from 'helmet';
import path from 'path';
import morgan from 'morgan';
import { Server } from 'http';
import { MatchRouter } from './api/match/match.router';
import { DatabaseService } from './database/database.service';
import { RankingsRouter } from './api/rankings/rankings.router';
import { ProfileRouter } from './api/profile/profile.router';

export default class Express {
  public app: Application;
  public server: Server;

  constructor(private database: DatabaseService) {
    this.app = express();

    // Prefix middleware
    this.app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
    this.app.use(express.json());

    // Development logging
    this.app.use(morgan('dev'));

    // Serve static files
    this.app.use(express.static(path.join(__dirname, '../website')));

    // API routes
    this.app.use('/api', this.apiRouter());

    // Handle 404
    this.app.use((req, res) => {
      res.status(404).send('Not found.');
    });

    // Error handling
    this.app.use(this.errorHandler());

    // Start listening
    this.server = this.app.listen(process.env.SERVER_PORT, () => {
      console.info('Express server started.');
    });
  }

  /**
   * Constructs the API router
   *
   */
  private apiRouter() {
    const apiRouter = Router();

    // Testing routes
    this.app.get('/', (req, res) => {
      this.calculateNewElos(1658, 1125, 2);
      res.send('Hello world!');
    });

    this.app.get('/async', async (req, res) => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      throw new Error('testing async error');
      res.send('Async test.');
    });

    // API routes
    apiRouter.use('/match', new MatchRouter(this.database).router());
    apiRouter.use('/rankings', new RankingsRouter(this.database).router());
    apiRouter.use('/profile', new ProfileRouter(this.database).router());

    return apiRouter;
  }

  private errorHandler() {
    return (err: Error, req: Request, res: Response, next: NextFunction) => {

      console.error(`Express error - endpoint: ${req.originalUrl} - Error: ${err}`);

      res.status(500).send('Unexpected server error.');
    };
  }

  private calculateNewElos(avatar1: number, avatar2: number, winner: number) {
    console.log('avatar1 change:', Math.round(30 * ((winner === 1 ? 1 : 0) - this.winProbability(avatar1, avatar2))));
    console.log('avatar2 change:', Math.round(30 * ((winner === 2 ? 1 : 0) - this.winProbability(avatar2, avatar1))));
  }

  private winProbability(rating1: number, rating2: number) {
    return 1 / (1 + Math.pow(10, (rating2 - rating1) / 400));
  }

}