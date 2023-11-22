import mongoose, { Schema } from "mongoose";

export interface INotification {
    uuid: string;
    message: string;
    users_uuid?: string[];
    task_uuid?: string;
    isRead?: boolean;
    created_at: Date;
}

const NotificationSchema: Schema<INotification> = new Schema(
    {
        uuid: { type: String, unique: true },
        message: { type: String },
        users_uuid: { type: String },
        task_uuid: { type: [String] },
        isRead: { type: Boolean },
        created_at: { type: Date },
    }
)

export default mongoose.model<INotification>('notification', NotificationSchema);
