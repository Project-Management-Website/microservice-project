import { FilterQuery, ProjectionType, QueryOptions, UpdateQuery } from "mongoose";
import notificationModel, { INotification } from "./notification.model";
import { checkMongoErr } from "../../helpers/catchError.helper";

export async function getNotification(
    conditions: FilterQuery<INotification>,
    select: ProjectionType<INotification> = {},
    options: QueryOptions = { lean: true }
): Promise<INotification | null> {
    const query : FilterQuery<INotification> = {
        ...conditions,
    }

    try {
        const noti = await notificationModel.findOne(query, select, options);
        return noti;
    } catch (err) {
        throw checkMongoErr(err as Error)
    }
}

export async function getNotifications(
    conditions: FilterQuery<INotification>,
    select: ProjectionType<INotification> = {},
    options: QueryOptions = { lean: true }
): Promise<Array<INotification> | null> {
    const query : FilterQuery<INotification> = {
        ...conditions,
    }
    try {
        const noti = await notificationModel.find(query, select, options);
        return noti;
    } catch (err) {
        throw checkMongoErr(err as Error)
    }
}

export async function createNotification(
    input: INotification
): Promise<INotification> {
    try {
        const newNoti = await notificationModel.create(input);
        return newNoti;
    } catch(err) {
        throw checkMongoErr(err as Error)
    }
}