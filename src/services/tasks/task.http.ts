import { NextFunction, Request, Response } from "express";
import { CreateDataInput, GetDetailInput, GetListInput, deleteTaskInput, updateTaskInput } from "./task.validate";
import { createTask, getTask, getTasks, removeTask, updateTask } from "./task.service";
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

    try {
        const { search, ...filter } = req.query;

        let conditions: FilterQuery<ITask> = filter
    
        if (search) {
            const pattern = new RegExp(search, 'i');
            conditions.$or = [{ title: pattern }, { assignee_uuid: pattern }, { reporter_uuid: pattern }]
        }
    
        console.log(conditions)
        
        const items = await getTasks(
            conditions,
            {
            
            },
            { lean: true, }
        );

        items?.forEach((item) => {
            
        })
        
        res.status(200).json({
          message: 'success',
          data: {
            // limit,
            // page,
            items,
          },})
    } catch (err) {
        next(err)
    }
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

        res.status(204).json({
            message: 'success',
            data: updatedTask,
        })
    } catch (err) {
    next(err);
    }
}

const remove = async (
    req: Request<deleteTaskInput['params']>,
    res: Response,
    next: NextFunction
) => {
    try {
        const conditions = req.params
    
        await removeTask(conditions)
    
        res.status(204).json({
            message: 'success',
        })
    } catch (err) {
        next(err)
    }
}

export default {
    list,
    detail,
    create,
    update,
    remove,
}