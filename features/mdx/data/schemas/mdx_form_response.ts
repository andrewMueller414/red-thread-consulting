import { z } from "zod";

export const formDataValueSchema = z.union([
    z.string(),
    z.number(),
    z.string().array(),
    z.number().array(),
]);

export const formDataSchema = z.record(z.string(), formDataValueSchema);

export const mdxFormSchema = z.object({
    id: z.number(),
    data: formDataSchema,
    ctime: z.date(),
    reviewed_at: z.date().nullish(),
});

export type MdxForm = z.infer<typeof mdxFormSchema>;
/** The input of the MdxForm type and mdxForm schema. */
export type MdxFormInputData = z.input<typeof mdxFormSchema>;
