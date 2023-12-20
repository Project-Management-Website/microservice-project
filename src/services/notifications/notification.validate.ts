import { z, TypeOf, object, string, boolean } from "zod";

const UserSchema = object({
  uuid: string({
    required_error: "uuid is required"
  }),
  username: string({
    required_error: "username is required"
  })
})
const TaskSchema = object({
    uuid: string({
      required_error: "uuid is required"
    }),
    title: string({
      required_error: "title is required"
    })
  })
  

const payload = {
    body: object({
        message: string({
            required_error: "Message is required",
        }),
        sender: UserSchema,
        receiver: UserSchema.array(),
        task: TaskSchema,
        isRead: boolean().optional(),
    })
}

const params = {
    params: object({
      uuid: string({
        required_error: 'uuid is required',
      }),
    }),
};

const query = {
    query: object({
      search: string().optional(),
    }),
  };

export const getNotificationSchema = object({
    ...params,
})

export const getNotificationsSchema = object({
    ...query,
})

export const createNotificationSchema = object({
    ...payload,
})

export type CreateDataInput = TypeOf<typeof createNotificationSchema>;
export type GetDetailInput = TypeOf<typeof getNotificationSchema>;
export type GetListInput = TypeOf<typeof getNotificationsSchema>;