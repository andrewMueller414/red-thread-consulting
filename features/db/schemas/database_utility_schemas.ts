import { z } from "zod";

export const dbEntityIdSchema = z.object({
    id: z.number(),
});
