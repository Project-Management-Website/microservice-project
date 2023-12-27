import { Server, Socket } from "socket.io";
import { IComment } from "./comment.model";
import { createComment } from "./comment.service";
import { v4 } from "uuid";

export const handler = async (io: Server, socket: Socket) => {
    io.on("comment:enter", (taskId: string) => {
        socket.join(taskId)
    })

    io.on("comment:leave", (taskId) => {
        socket.leave(taskId)
    })

    socket.on("comment:post",async (data: IComment) => {
        const newComment: IComment = {
            ...data,
            uuid: v4(),
            created_at: new Date()
        }
        await createComment(newComment)
        io.to(`${data.task}`).emit("comment:send", data)
    })
}