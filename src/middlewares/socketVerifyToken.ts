import { Server } from "socket.io";
import { authGrpc } from "../services/auth/auth.grpc";

export default function (io: Server) {
    io.use(async (socket, next) => {
        try {
            const accessToken = socket.handshake.auth.token
            if(!accessToken) throw new Error("Unauthorized")
            const user = await authGrpc(accessToken as string)
            if(!user) throw new Error("Unauthorized")
            socket.data.user = user.getUuid()
            next()
        } catch (error) {
            next(error as Error)
        }
    })
}