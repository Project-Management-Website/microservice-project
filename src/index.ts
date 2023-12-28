import config from "./config/config";
import mongo from "./lib/mongoose.lib";
import { createServer } from "./server";
import * as dotenv from "dotenv"
import { Server } from "socket.io";
import verifyToken from "./middlewares/socketVerifyToken";
import { handler } from "./services/comments/comment.socket";

let io: Server

async function init(): Promise<void> {
  try {
    dotenv.config()
        
    await mongo.connect();
    console.log('Connect to mongo')
    
    const port = config.Server.port || 3001;
    const server = createServer().listen(port, () => {
      console.log(`Listening on port ${port}`);
    });

    io = new Server(server, {
      cors: {
        origin: "*"
      }
    })

    io.on("connection",(socket) => {
      verifyToken(io)

      console.log("client connected:", socket.id)
      handler(io, socket)
    })

  } catch (err) {
    console.log('Connect failed');
    return;
  }
}

init();

export {
  io,
}