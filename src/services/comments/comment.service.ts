import { FilterQuery, ProjectionType, QueryOptions } from "mongoose";
import { checkMongoErr } from "../../helpers/catchError.helper";
import commentModel, { IComment } from "./comment.model";

export async function getComment(
    conditions: FilterQuery<IComment>,
    select: ProjectionType<IComment> = {},
    options: QueryOptions = { lean: true }
): Promise<IComment | null> {
    const query : FilterQuery<IComment> = {
        ...conditions,
    }

    try {
        const comment = await commentModel.findOne(query, select, options);
        return comment;
    } catch (err) {
        throw checkMongoErr(err as Error)
    }
}

export async function getComments(
    conditions: FilterQuery<IComment>,
    select: ProjectionType<IComment> = {},
    options: QueryOptions = { lean: true }
): Promise<Array<IComment> | null> {
    const query : FilterQuery<IComment> = {
        ...conditions,
    }
    try {
        const comment = await commentModel.find(query, select, options);
        return comment;
    } catch (err) {
        throw checkMongoErr(err as Error)
    }
}

export async function createComment(
    input: IComment
): Promise<IComment> {
    try {
        const newComment = await commentModel.create(input);
        return newComment;
    } catch(err) {
        throw checkMongoErr(err as Error)
    }
}