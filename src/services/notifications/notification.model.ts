import mongoose, { Schema } from "mongoose";
import { IUser } from "../tasks/task.model";

interface ITask {
    uuid: string,
    title: string
}

export interface INotification {
    uuid: string;
    message: string;
    sender?: IUser;
    receiver?: IUser[];
    task?: ITask;
    isRead?: boolean;
    created_at: Date;
}

const NotificationSchema: Schema<INotification> = new Schema(
    {
        uuid: { type: String, unique: true },
        message: { type: String },
        sender: { type: {
            uuid: { type: String },
            username: { type: String },
            _id: false,
        }},
        receiver: { type: [{
            uuid: { type: String },
            username: { type: String },
            _id: false,
        }]},
        task: { type: {
            uuid: { type: String },
            title: { type: String },
            _id: false,
        }},
        isRead: { type: Boolean },
        created_at: { type: Date, default: Date.now() },
    }
)

export default mongoose.model<INotification>('notification', NotificationSchema);
