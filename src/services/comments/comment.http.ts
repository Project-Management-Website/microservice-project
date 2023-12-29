import { NextFunction, Request, Response } from "express";
import { getComments } from "./comment.service";
import { FilterQuery } from "mongoose";
import { IComment } from "./comment.model";
import { GetListInput } from "./comment.validate";

const list = async (
    req: Request<never, never, GetListInput['query']>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { user } = res.locals
        const taskUuid = req.query

        let conditions: FilterQuery<IComment> = taskUuid
        console.log(conditions)
        const items = await getComments(
            conditions,
            {
                _id: 0,
            },
            { lean: true }
        );
        
        res.status(200).json({
          message: 'success',
          data: {
            items,
          },
        })
    } catch (err) {
        next(err)
    }
}

export default {
    list,
}