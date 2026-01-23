import { z } from "zod";

export const dbEntityIdSchema = z.object({
    id: z.number(),
});

export const paginationSchema = z.object({
    perPage: z.number().int().min(1).default(10),
    page: z.number().int().min(1).default(1),
});
