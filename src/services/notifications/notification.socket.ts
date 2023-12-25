import { Server, Socket } from "socket.io"
import { TUserList, findSocketIdByUserUuid } from "../../helpers/socketList.helper";

let io: Server
let socket: Socket

export const handler = (_io: Server, _socket: Socket): void => {
    io = _io;
    socket = _socket
}

export const notify = (receiver: string) => {
    const users: TUserList = [];
    for (let [id, socket] of io.of("/").sockets) {
    users.push({
        socketId: id,
        userUuid: socket.data.user
    });

    const to = findSocketIdByUserUuid(users, receiver)
    console.log(to)
    socket.to(to).emit("notif:notify", {
        message: "You are assigned a new task"
    })
}}
