import { TypeOf, date, object, string } from "zod";

const payload = {
    body: object({
        title: string({
            required_error: "Title is required"
        }),
        description: string().optional(),
        assignee_uuid: string().optional(),
        status: string().optional(),
        priority: string().optional(),
        due_date: date().optional(),
        project_uuid: string({
          required_error: "Project is required"
        })
    })
}

const params = {
    params: object({
      id: string({
        required_error: 'id is required',
      }),
    }),
};

const query = {
    query: object({
      page: string({
        required_error: 'page must be a number',
      })
        .default('1')
        .transform((val) => parseInt(val)),
      limit: string({
        required_error: 'page must be a number',
      })
        .default('10')
        .transform((val) => parseInt(val)),
      search: string().optional(),
      project_uuid: string({
        required_error: 'Project is required'
      })
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

export type CreateDataInput = TypeOf<typeof createTaskSchema>;
export type GetDetailInput = TypeOf<typeof getDetailSchema>;
export type GetListInput = TypeOf<typeof getListSchema>;