import { z } from "zod";
import {
    checkboxPropsSchema,
    ReorderInputItem,
    reorderInputProps,
    textAreaInputProps,
    textInputPropsSchema,
} from "./input_props_schemas";

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

const checkboxMeta = checkboxPropsSchema.omit({ name: true });
const textInputMeta = textInputPropsSchema.omit({ name: true, maxWidth: true });
const textAreaMeta = textAreaInputProps.omit({ name: true, maxWidth: true });
const reorderMeta = reorderInputProps.omit({ name: true });

export const formDataNestedValueSchema = z.object({
    inputId: z.nativeEnum(InputId),
    value: formDataValueSchema,
    meta: z.union([reorderMeta, checkboxMeta, textInputMeta, textAreaMeta]),
});

export const formDataSchema = z.record(z.string(), formDataNestedValueSchema);

export const mdxFormSchema = z.object({
    formId: z.string().min(1, "The formId can't be empty."),
    data: formDataSchema,
    formFieldNames: z.string().array().default([]),
    mdxSourceId: z.string().nullish(),
    ctime: z.date(),
    reviewed_at: z.date().nullish(),
});

export type MdxForm = z.infer<typeof mdxFormSchema>;
/** The input of the MdxForm type and mdxForm schema. */
export type MdxFormInput = z.input<typeof mdxFormSchema>;

export type MdxFormData = z.infer<typeof formDataSchema>;

export type NestedFormValue = z.infer<typeof formDataNestedValueSchema>;

export interface PreviewComponentProps<
    T extends string | boolean | ReorderInputItem[],
> {
    disabled?: boolean;
    valueOverride?: T;
}

export type MdxFormValue = z.infer<typeof formDataValueSchema>;

export type CheckboxMeta = z.infer<typeof checkboxMeta>;
export type TextInputMeta = z.infer<typeof textInputMeta>;
export type TextAreaMeta = z.infer<typeof textAreaMeta>;
export type ReorderMeta = z.infer<typeof reorderMeta>;
