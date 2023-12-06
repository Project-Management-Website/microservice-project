import { NextFunction, Request, Response } from 'express';
import { authGrpc } from '../services/auth/auth.grpc';
import createHttpError from 'http-errors';

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.headers['jwt-token'];
    if (!accessToken) {
      throw createHttpError(401, 'Unauthorized')
    }

    const user = await authGrpc(accessToken as string);
    if (user) {
      res.locals.user = user;
    }

    return next();
  } catch (err) {
    next(err);
  }
};

export default verifyToken;
