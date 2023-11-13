import mongoose, { Schema } from "mongoose";

export interface ITask {
    uuid: string;
    title: string;
    description?: string;
    creator_uuid?: string;
    assignee_uuid?: string;
    status?: string;
    created_at: Date;
    update_at?: Date;
    due_date?: Date;
    priority?: string;
    project_uuid?: string;
}

const TaskSchema: Schema<ITask> = new Schema(
    {
        uuid: { type: String, unique: true },
        title: { type: String },
        description: { type: String },
        creator_uuid: { type: String },
        assignee_uuid: { type: String },
        status: { type: String },
        created_at: { type: Date, default: Date.now },
        due_date: { type: Date },
        update_at: { type: Date },
        priority: { type: String },
        project_uuid: { type: String },
    },
    {
        versionKey: false,
        timestamps: false,
    }
);

TaskSchema.index({ uuid: 1 });

export default mongoose.model<ITask>('task', TaskSchema)