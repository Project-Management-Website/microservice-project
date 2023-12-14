import { Server, Socket } from "socket.io"
import { CreateDataInput } from "./notification.validate"

const handler = (io: Server, socket: Socket) => {
    socket.on("notif:create", (data: CreateDataInput) => {

        socket.emit("notif:notify", {
            message: "Do da task"
        })
    })
}

export = handler