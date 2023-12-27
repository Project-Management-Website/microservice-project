import { Expression } from "mongoose";
import taskRouter from "../services/tasks/task.route"; 
import projectRouter from "../services/projects/project.route"
import commentRouter from "../services/comments/comment.route"

export function createRoute(app: Expression) {
    app.use('/task', taskRouter)
    app.use('/comment', commentRouter)
    app.use('/project', projectRouter)
}