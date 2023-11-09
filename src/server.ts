import { Expression } from "mongoose";
import express, { NextFunction, Request, Response } from "express"
import { createRoute } from "./routes";
import { HttpError } from 'http-errors';
import verifyToken from "./middlewares/verifyToken";

export function createServer() :Expression {
    const app = express();
    middlewares(app);
    createRoute(app);

    app.use(
      (err: HttpError, _req: Request, res: Response, next: NextFunction) => {
  
        if (err.status) {
          res.status(err.status).json({ code: err.status, message: err.message });
          next();
          return;
        }

        res.status(500).json({ code: 500, message: 'internal server' });
        next();
      }
    );
      

    return app;
}

function middlewares(app: express.Express): void {
  app.use(express.json())

  app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization, jwt-token'
      );
  
      if (req.method == 'OPTIONS') {
        res.header(
          'Access-Control-Allow-Methods',
          'PUT, POST, PATCH, DELETE, GET'
        );
  
        return res.status(200).json({});
      }
  
      next();
    });

  app.use(verifyToken)

}