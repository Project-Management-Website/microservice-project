
import { Expression } from "mongoose";


export function createRoute(app: Expression) {
    app.use('/user', taskRoute)
}