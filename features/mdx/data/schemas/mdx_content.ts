import z from "zod";

export const mdxContentSchema = z.object({
    id: z.string().min(1).max(20),
    body: z.string(),
    formId: z.string().or(z.null()),
    ctime: z.date().default(new Date()),
    reviewed_at: z.date().or(z.null()).default(null),
});

export const mdxContentIdSchema = mdxContentSchema.pick({ id: true });
