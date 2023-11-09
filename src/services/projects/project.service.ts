import { FilterQuery, ProjectionType, QueryOptions } from "mongoose";
import projectModel, { IProject } from "./project.model";
import { checkMongoErr } from "../../helpers/catchError.helper";

export async function getProject(
    conditions: FilterQuery<IProject>,
    select: ProjectionType<IProject> = {},
    options: QueryOptions = { lean: true }
): Promise<IProject | null> {
    const query : FilterQuery<IProject> = {
        ...conditions,
    }

    try {
        const project = await projectModel.findOne(query, select, options);
        return project;
    } catch (err) {
        throw checkMongoErr(err as Error)
    }
}

export async function getProjects(
    conditions: FilterQuery<IProject>,
    select: ProjectionType<IProject> = {},
    options: QueryOptions = { lean: true }
): Promise<Array<IProject> | null> {
    const query : FilterQuery<IProject> = {
        ...conditions,
    }

    try {
        const project = await projectModel.find(query, select, options);
        return project;
    } catch (err) {
        throw checkMongoErr(err as Error)
    }
}

export async function createProject(
    input: IProject
): Promise<IProject> {
    try {
        const newproject = await projectModel.create(input);
        return newproject;
    } catch(err) {
        throw checkMongoErr(err as Error)
    }
}