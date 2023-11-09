import config from "./config/config";
import mongo from "./lib/mongoose.lib";
import { createServer } from "./server";
import * as dotenv from "dotenv"

async function init(): Promise<void> {
  try {
    dotenv.config()
        
    await mongo.connect();
    console.log('Connect to mongo')
    
    const port = config.Server.port || 3001;
    console.log(port)
    createServer().listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
    
  } catch (err) {
    console.log('Connect failed');
    return;
  }
}

init();