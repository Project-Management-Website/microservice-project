import * as dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.APP_PORT || 3001,
  grpc_auth: process.env.AUTH_GRPC || "localhost:5000"
};
