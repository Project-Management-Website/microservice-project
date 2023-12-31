import mongoose, { Schema } from "mongoose";

export interface IUser {
    uuid: string;
    username: string;
}

export interface ITask {
    uuid: string;
    title: string;
    description?: string;
    reporter: IUser | undefined;
    assignee: IUser | undefined;
    status: string;
    created_at: Date;
    update_at?: Date;
    due_date: Date;
    priority: string;
    project?: string;
}

const TaskSchema: Schema<ITask> = new Schema(
    {
        uuid: { type: String, unique: true },
        title: { type: String },
        description: { type: String },
        reporter: { type: {
            uuid: { type: String, default: '' },
            username: { type: String, default: '' },
            _id: false,
        }},
        assignee: { type: {
            uuid: { type: String, default: '' },
            username: { type: String, default: '' },
            _id: false,
        }},
        status: { type: String },
        created_at: { type: Date, default: Date.now },
        due_date: { type: Date },
        update_at: { type: Date },
        priority: { type: String },
        project: { type: String },
    },
    {
        versionKey: false,
        timestamps: false,
    }
);

TaskSchema.index({ uuid: 1 });

export default mongoose.model<ITask>('task', TaskSchema)