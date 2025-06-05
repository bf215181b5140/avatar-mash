import express, { Application, NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import path from 'path';
import { Server } from 'http';

export default class Express {
  public app: Application;
  public server: Server;

  constructor() {
    this.app = express();

    // Prefix middleware
    this.app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

    // Serve static files
    this.app.use(express.static(path.join(__dirname, '../website')));

    // API routes
    this.addRoutes();

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

  private addRoutes() {
    this.app.get('/', (req, res) => {
      this.calculateNewElos(1658, 1125, 2);
      res.send('Hello world!');
    });

    this.app.get('/async', async (req, res) => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      throw new Error('testing async error');
      res.send('Async test.');
    });
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