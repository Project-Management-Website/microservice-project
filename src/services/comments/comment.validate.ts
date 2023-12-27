import { TypeOf, object, string } from "zod";

const query = {
    query: object({
        search: string().optional(),
    }),
};

export const getListSchema = object({
    ...query
})

export type GetListInput = TypeOf<typeof getListSchema>;