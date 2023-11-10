import { NextFunction, Request, Response } from "express";
import { CreateDataInput, GetDetailInput, GetListInput } from "./task.validate";
import { createTask, getTask, getTasks } from "./task.service";
import createHttpError from "http-errors";
import { FilterQuery } from "mongoose";
import { ITask } from "./task.model";
import { v4 } from "uuid";

const detail = async (
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

const list = async (
    req: Request<never, never, never, GetListInput['query']>,
    res: Response,
    next: NextFunction
) => {

    const { limit, page, search } = req.query;
    const conditions: FilterQuery<ITask> = req.query
    
    const items = await getTasks(
        conditions,
        {

        },
        { lean: true, }
      );
    
    res.status(200).json({
      message: 'success',
      data: {
        limit,
        page,
        items,
      },})
}

const create = async (
    req: Request<never, never, CreateDataInput['body']>,
    res: Response,
    next: NextFunction,
) => {
    try {
        const newTaskData: ITask = {
            uuid: v4(),
            ...req.body,
            created_at: new Date()
        }

        const newTask = await createTask(newTaskData);

        res.status(201).json({
            message: "success",
            data: newTask,
        })
    } catch (err) {
        next(err)
    }
}

export default {
    list,
    detail,
    create
}