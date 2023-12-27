import mongoose, { Mongoose, Schema } from "mongoose"

interface IUser {
    uuid: string,
    username: string,
}
export interface IComment {
    uuid: string,
    sender?: IUser,
    content: string,
    task: string,
    created_at: Date,
}

const CommentSchema: Schema<IComment> = new Schema(
    {
        uuid: { type: String, unique: true },
        sender: {
            uuid: { type: String },
            username: { type: String },
            _id: false
        },
        content: { type: String },
        task: { type: String },
        created_at: { type: Date, default: new Date() }
    }
)

export default mongoose.model<IComment>("comment", CommentSchema)