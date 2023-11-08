import { NextFunction, Request, Response } from "express";
import { GetDetailInput, GetListInput } from "./task.validate";
import { getTask, getTasks } from "./task.service";
import createHttpError from "http-errors";
import { FilterQuery } from "mongoose";
import { ITask } from "./task.model";

export const detail = async (
    req: Request<GetDetailInput['params']>,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await getTask(
            {
                uuid: req.params.id
            },
            {
                uuid: 0,
            }
        )
        if (!user) {
            throw new createHttpError.NotFound('Task not found');
        }
        res.status(200).json({
            user,
        })
    } catch (err) {
        next(err);
    }
}

export const list = async (
    req: Request<never, never, never, GetListInput['query']>,
    res: Response,
    next: NextFunction
) => {

    const { limit, page, search } = req.query;
    const conditions: FilterQuery<ITask> = req.query
    
    const items = await getTasks(
        conditions,
        {
          client_uuid: 1,
          store_uuid: 1,
          store_group_uuid: 1,
          key: 1,
          value: 1,
          is_active: 1,
          uuid: 1
        },
        { lean: true, }
      );
    
    res.status(200).json({
      message: 'success',
      data: {
        limit,
        page,
        pages: totalPage,
        items,
        total,
      },})
}
