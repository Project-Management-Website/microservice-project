import { NextFunction, Request, Response } from "express";
import { CreateDataInput, GetDetailInput, GetListInput } from "./notification.validate";
import { createNotification, getNotification, getNotifications } from "./notification.service";
import createHttpError from "http-errors";
import { FilterQuery } from "mongoose";
import { INotification } from "./notification.model";
import { v4 } from "uuid";

const detail = async (
    req: Request<GetDetailInput['params']>,
    res: Response,
    next: NextFunction
) => {
    try {
        const task = await getNotification(
            {
                uuid: req.params.uuid
            },
            {
                
            }
        )
        if (!task) {
            throw new createHttpError.NotFound('Notification not found');
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
        const { user } = res.locals

        let conditions: FilterQuery<INotification> = user
        console.log(conditions)

        const items = await getNotifications(
            conditions,
            {
            
            },
            { lean: true, sort: { _id: -1 } }
        );
        
        res.status(200).json({
          message: 'success',
          data: {
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
        const newNotif: INotification = {
            uuid: v4(),
            ...req.body,
            created_at: new Date()
        }

        const data = await createNotification(newNotif);

        res.status(201).json({
            message: "success",
            data,
        })
    } catch (err) {
        next(err)
    }
}

export default {
    detail, 
    list,
    create
}