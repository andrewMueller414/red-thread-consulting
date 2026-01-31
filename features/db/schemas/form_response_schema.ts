import { formDataSchema } from "@/features/mdx/data/schemas/mdx_form_response";
import { FormResponse } from "@/lib/generated/prisma/client";
import z from "zod";

export const formResponseSchema = z.object({
    id: z.number().int(),
    data: formDataSchema,
    ctime: z.date(),
    reviewed_at: z.date().nullable(),
    /** The id of the mdx content that produced this form response. */
    mdxSourceId: z.string(),
}) satisfies z.ZodType<FormResponse>;
