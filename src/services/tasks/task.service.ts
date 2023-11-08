import { FilterQuery, ProjectionType, QueryOptions } from "mongoose";
import taskModel, { ITask } from "./task.model";
import { checkMongoErr } from "../../helpers/catchError.helper";

export async function getTask(
    conditions: FilterQuery<ITask>,
    select: ProjectionType<ITask> = {},
    options: QueryOptions = { lean: true }
): Promise<ITask | null> {
    const query : FilterQuery<ITask> = {
        ...conditions,
    }

    try {
        const task = await taskModel.findOne(query, select, options);
        return task;
    } catch (err) {
        throw checkMongoErr(err as Error)
    }
}

export async function getTasks(
    conditions: FilterQuery<ITask>,
    select: ProjectionType<ITask> = {},
    options: QueryOptions = { lean: true }
): Promise<Array<ITask> | null> {
    const query : FilterQuery<ITask> = {
        ...conditions,
    }

    try {
        const task = await taskModel.find(query, select, options);
        return task;
    } catch (err) {
        throw checkMongoErr(err as Error)
    }
}

export async function createTask(
    input: ITask
): Promise<ITask> {
    try {
        const newTask = await taskModel.create(input);
        return newTask;
    } catch(err) {
        throw checkMongoErr(err as Error)
    }
}