import { FilterQuery, ProjectionType, QueryOptions, UpdateQuery } from "mongoose";
import taskModel, { ITask } from "./task.model";
import { checkMongoErr } from "../../helpers/catchError.helper";
import createHttpError from "http-errors";

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

export async function updateTask(
    conditions: FilterQuery<ITask>,
    input: UpdateQuery<ITask> = {},
    options: QueryOptions = { new: true, lean: true }
):Promise<ITask> {
    try {
        const task = await taskModel.findOneAndUpdate(
            {
                ...conditions,
            },
            input,
            options
        )
        if (!task) {
            throw new createHttpError.NotFound("Task not found")
        }
        return task;
    } catch (err) {
        throw checkMongoErr(err as Error)
    }
}

export async function removeTask(
    conditions: FilterQuery<ITask>,
) {
    try {
        await taskModel.deleteOne(conditions);
    } catch (err) {
        throw checkMongoErr(err as Error)
    }
}

export async function countTask(
    conditions: FilterQuery<ITask>
  ): Promise<number> {
    const query: FilterQuery<ITask> = {
      ...conditions,
    };
  
    try {
      const result = await taskModel.countDocuments(query);
      return result || 0;
    } catch (err) {
      throw checkMongoErr(err as Error);
    }
}