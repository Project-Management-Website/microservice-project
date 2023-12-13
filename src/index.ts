import config from "./config/config";
import mongo from "./lib/mongoose.lib";
import { createServer } from "./server";
import * as dotenv from "dotenv"
import { Server } from "socket.io";
import taskSocketHandler from "./services/tasks/task.socket"

async function init(): Promise<void> {
  try {
    dotenv.config()
        
    await mongo.connect();
    console.log('Connect to mongo')
    
    const port = config.Server.port || 3001;
    const server = createServer().listen(port, () => {
      console.log(`Listening on port ${port}`);
    });

    const io = new Server(server, {
      cors: {
        origin: "*"
      }
    })

    io.on("connection", (socket) => {
      console.log("client connected")
      taskSocketHandler(io, socket)
    })

  } catch (err) {
    console.log('Connect failed');
    return;
  }
}

init();