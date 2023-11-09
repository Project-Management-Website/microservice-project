import { TypeOf, date, object, string } from "zod";

const payload = {
    body: object({
        name: string({
            required_error: "Title is required"
        }),
        description: string().optional(),
        members: string().array().optional()
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
    }),
  };

export const getDetailSchema = object({
    ...params,
})

export const getListSchema = object({
    ...query,
})

export const createProjectSchema = object({
    ...payload,
})

export type CreateDataInput = TypeOf<typeof createProjectSchema>;
export type GetDetailInput = TypeOf<typeof getDetailSchema>;
export type GetListInput = TypeOf<typeof getListSchema>;