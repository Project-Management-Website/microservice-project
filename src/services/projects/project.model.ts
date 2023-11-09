import mongoose, { Schema } from "mongoose";

export interface IProject {
    uuid: string;
    name: string;
    description?: string;
    leader?: string;
    members?: string[];
    created_at: Date;
}

const ProjectSchema: Schema<IProject> = new Schema(
    {
        uuid: { type: String, unique: true },
        name: { type: String },
        description: { type: String },
        leader: { type: String },
        members: { type: [String] },
        created_at: { type: Date },
    }
)

export default mongoose.model<IProject>('project', ProjectSchema);
