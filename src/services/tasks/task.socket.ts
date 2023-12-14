import { Server, Socket } from "socket.io"

const foo = (io: Server, socket: Socket) => {
    let cons = 1
    socket.on("foo", () => {
        cons = 2

        socket.emit("barr", {
            cons
        })
    })

}

export = foo