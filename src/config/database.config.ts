import * as dotenv from 'dotenv';
dotenv.config();

export default {
  MongoUri: process.env.MONGODB_URI,
  MongoDbName: process.env.DB_NAME,
};
