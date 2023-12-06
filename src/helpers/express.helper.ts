import { Response } from 'express';
import { AuthResponse } from '../proto/external/user/user_service_pb';

export interface ResponseWithAuth extends Response {
  locals: {
    user: AuthResponse;
  };
}
