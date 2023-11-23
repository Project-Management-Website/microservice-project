import { credentials } from '@grpc/grpc-js';
import config from '../../config/config';
import { UserClient } from '../../proto/external/user/user_service_grpc_pb';
import {
  AuthRequest,
  AuthResponse,
  GetUserRequest,
  GetUserResponse,
} from '../../proto/external/user/user_service_pb';

const userClient = new UserClient(
  config.Server.grpc_auth as string,
  credentials.createInsecure()
);

export function authGrpc(token: string) {
  return new Promise<AuthResponse>((resolve, reject) => {
    const request = new AuthRequest();
    request.setToken(token);

    userClient.auth(request, (err, user) => {
      if (err) reject(err);
      else resolve(user);
    });
  });
}

export function getUserGrpc(uuid: string) {
  return new Promise<GetUserResponse>((resolve, reject) => {
    const request = new GetUserRequest();
    request.setUuid(uuid);

    userClient.getUser(request, (err, user) => {
      if (err) reject(err);
      else resolve(user)
    })
    
  });
}