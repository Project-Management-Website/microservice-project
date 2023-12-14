import { Server } from "socket.io";
import { authGrpc } from "../services/auth/auth.grpc";

export default async function (io: Server) {
    io.use((socket, next) => {
        try {
            const accessToken = socket.handshake.auth.token
            if(!accessToken) throw new Error("Unauthorized")

            const user = authGrpc(accessToken as string)
            if(!user) throw new Error("Unauthorized") 

            next()
        } catch (error) {
            next(error as Error)
        }
    })
}