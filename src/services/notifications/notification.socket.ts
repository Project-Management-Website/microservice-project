import { Server, Socket } from "socket.io"
import { TUserList, findSocketIdByUserUuid } from "../../helpers/socketList.helper";

const handler = (io: Server, socket: Socket) => {
    const users: TUserList = [];

    socket.on("notif:create", (data) => {
        for (let [id, socket] of io.of("/").sockets) {
            users.push({
                socketId: id,
                userUuid: socket.data.user
            });
        }
        console.log(users)

        const to = findSocketIdByUserUuid(users, data.receiver)
        console.log(to)
        socket.to(to).emit("notif:notify", {
            message: "You are assigned a new task"
        })
    })
}

export = handler