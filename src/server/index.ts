import './dotenv';
import Express from './express';
import { DatabaseService } from './database/database.service';

new DatabaseService().initialize().then(database => {

  const server = new Express(database);

}).catch(err => console.log('Failed to initialize database', err));
