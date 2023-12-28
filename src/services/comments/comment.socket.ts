import { Server, Socket } from "socket.io";
import { IComment } from "./comment.model";
import { createComment } from "./comment.service";
import { v4 } from "uuid";

export const handler = async (io: Server, socket: Socket) => {
    socket.on("comment:enter", (taskId: string) => {
        console.log(taskId)
        socket.join(taskId)
    })

    socket.on("comment:leave", (taskId) => {
        socket.leave(taskId)
    })

    socket.on("comment:post",async (data: IComment) => {
        const newComment: IComment = {
            ...data,
            uuid: v4(),
            created_at: new Date()
        }
        console.log(data)
        console.log(newComment)
        await createComment(newComment)
        io.to(`${data.task}`).emit("comment:send", data)
    })
}