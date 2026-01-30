import { z } from "zod";

export const formDataValueSchema = z.union([
    z.boolean(),
    z.string(),
    z.number(),
    z.string().array(),
    z.number().array(),
]);

export enum InputId {
    checkbox = "cb",
    text = "text",
    textArea = "text-area",
    reorder = "reorder",
}

export const formDataNestedValueSchema = z.object({
    inputId: z.nativeEnum(InputId),
    value: formDataValueSchema,
});

export const formDataSchema = z.record(z.string(), formDataNestedValueSchema);

export const mdxFormSchema = z.object({
    formId: z.string().min(1, "The formId can't be empty."),
    data: formDataSchema,
    mdxSourceId: z.string().nullish(),
    ctime: z.date(),
    reviewed_at: z.date().nullish(),
});

export type MdxForm = z.infer<typeof mdxFormSchema>;
/** The input of the MdxForm type and mdxForm schema. */
export type MdxFormInput = z.input<typeof mdxFormSchema>;

export type MdxFormData = z.infer<typeof formDataSchema>;

export type NestedFormValue = z.infer<typeof formDataNestedValueSchema>;

export type MdxFormValue = z.infer<typeof formDataValueSchema>;
