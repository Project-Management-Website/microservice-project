import { NextFunction, Request, Response } from "express";
import { CreateDataInput, GetDetailInput, GetListInput } from "./project.validate";
import { createProject, getProject, getProjects } from "./project.service";
import createHttpError from "http-errors";
import { FilterQuery } from "mongoose";
import { IProject } from "./project.model";
import { v4 } from "uuid";

const detail = async (
    req: Request<GetDetailInput['params']>,
    res: Response,
    next: NextFunction
) => {
    try {
        const project = await getProject(
            {
                uuid: req.params.uuid
            },
            {

            }
        )
        if (!project) {
            throw new createHttpError.NotFound('project not found');
        }
        res.status(200).json({
            project,
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
    const conditions: FilterQuery<IProject> = req.query
    
    const items = await getProjects(
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
        const newprojectData: IProject = {
            uuid: v4(),
            ...req.body,
            created_at: new Date()
        }

        const newproject = await createProject (newprojectData);

        res.status(201).json({
            message: "success",
            data: newproject,
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