import z from "zod";

export const mdxContentSchema = z.object({
    id: z.string().min(1),
    body: z.string(),
    ctime: z.date().default(new Date()),
    utime: z.date().default(new Date()),
});

export const mdxContentIdSchema = mdxContentSchema.pick({ id: true });
