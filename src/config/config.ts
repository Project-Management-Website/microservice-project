import databaseConfig from './database.config';
import serverConfig from './server.config';

export default {
  Database: { ...databaseConfig },
  Server: { ...serverConfig },
};
