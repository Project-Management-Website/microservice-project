import { TypeOf, object, string } from "zod";

const query = {
    query: object({
        task: string().optional(),
    }),
};

export const getListSchema = object({
    ...query
})

export type GetListInput = TypeOf<typeof getListSchema>;