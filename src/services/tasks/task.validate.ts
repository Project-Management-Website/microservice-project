import { z, TypeOf, object, string } from "zod";

const UserSchema = object({
  uuid: string({
    required_error: "uuid is required"
  }),
  username: string({
    required_error: "username is required"
  })
})

const payload = {
    body: object({
        title: string({
            required_error: "Name is required"
        }),
        description: string().optional(),
        assignee: UserSchema,
        reporter: UserSchema,
        status: string({
            required_error: "Status is required"
        }),
        priority: string({
            required_error: "Priority is required"
        }),
        due_date: z.coerce.date(),
        // project_uuid: string({
        //   required_error: "Project is required"
        // })
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
      page: string({
        required_error: 'page is required',
      })
        .default('1')
        .transform((val) => parseInt(val)),
      limit: string({
        required_error: 'limit is required',
      })
        .default('10')
        .transform((val) => parseInt(val)),
      search: string().optional(),
      status: string().optional(),
      priority: string().optional()
    }),
  };

export const getDetailSchema = object({
    ...params,
})

export const getListSchema = object({
    ...query,
})

export const createTaskSchema = object({
    ...payload,
})

export const updateTaskSchema = object({
  ...params,
  ...payload,
})

export const deleteTaskSchema = object({
  ...params,
})

export type CreateDataInput = TypeOf<typeof createTaskSchema>;
export type GetDetailInput = TypeOf<typeof getDetailSchema>;
export type GetListInput = TypeOf<typeof getListSchema>;
export type updateTaskInput = TypeOf<typeof updateTaskSchema>
export type deleteTaskInput = TypeOf<typeof deleteTaskSchema>