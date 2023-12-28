import { NextFunction, Request, Response } from "express";
import { getComments } from "./comment.service";
import { FilterQuery } from "mongoose";
import { IComment } from "./comment.model";

const list = async (
    req: Request<never, never, never>,
    res: Response,
    next: NextFunction
) => {
    
    try {
        const { user } = res.locals

        let conditions: FilterQuery<IComment> = {}

        const items = await getComments(
            conditions,
            {
            
            },
            { lean: true, sort: { _id: -1 } }
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