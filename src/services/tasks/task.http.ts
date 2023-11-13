import { NextFunction, Request, Response } from "express";
import { CreateDataInput, GetDetailInput, GetListInput, updateTaskInput } from "./task.validate";
import { createTask, getTask, getTasks, updateTask } from "./task.service";
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
        const task = await getTask(
            {
                uuid: req.params.uuid
            },
            {

            }
        )
        if (!task) {
            throw new createHttpError.NotFound('Task not found');
        }
        res.status(200).json({
            task,
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

const update = async (
    req: Request<updateTaskInput['params'], never, updateTaskInput['body']>,
    res: Response,
    next: NextFunction
) => {
    try { 
        console.log(req.body)
        const updatedTask = await updateTask(
            {
                uuid: req.params.uuid,
            },
            {
                $set: {
                    ...req.body,
                    update_at: new Date()
                }
            },
        )

        res.status(201).json({
            message: 'success',
            data: updatedTask,
        })
    } catch (err) {
    next(err);
    }
}

export default {
    list,
    detail,
    create,
    update
}