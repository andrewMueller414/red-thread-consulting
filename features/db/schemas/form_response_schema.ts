import { formDataSchema } from "@/features/mdx/data/schemas/mdx_form_response";
import z from "zod";

export const formResponseSchema = z.object({
    id: z.number().int(),
    formId: z
        .string()
        .min(1, "This is required to identify the forms later")
        .max(20, "This string is too long"),
    data: formDataSchema,
    ctime: z.date(),
    reviewed_at: z.date().nullish(),
    /** The id of the mdx content that produced this form response. */
    mdxSourceId: z.string(),
});
