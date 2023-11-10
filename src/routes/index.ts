
import { Expression } from "mongoose";
import taskRouter from "../services/tasks/task.route"; 
import projectRouter from "../services/projects/project.route"
import verifyToken from "../middlewares/verifyToken";


export function createRoute(app: Expression) {
    app.use('/task', taskRouter)
    app.use('/project', projectRouter)
}