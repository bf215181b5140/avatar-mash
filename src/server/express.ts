import { DatabaseService } from './database/database.service';
import ErrorMiddleware from './middleware/error.middleware';
import { Server } from 'http';

export default class Express extends ErrorMiddleware {
  public server: Server;

  constructor(database: DatabaseService) {
    super(database);

    // Start listening
    this.server = this.app.listen(process.env.SERVER_PORT, () => {
      console.info('Express server started.');
    });
  }
}