import { Server, Socket } from "socket.io"
import { CreateDataInput } from "./notification.validate"

const handler = (io: Server, socket: Socket) => {
    const users = [];
    console.log(socket.data)
    for (let [id, socket] of io.of("/").sockets) {
        users.push({
            socketId: id,
            userUuid: socket.data.user
        });
    }
    console.log(users)

    socket.on("notif:create", (data: CreateDataInput) => {
        console.log(socket.data.user)
        console.log(data)
        io.emit("notif:notify", {
            message: "Do da task"
        })
    })
}

export = handler