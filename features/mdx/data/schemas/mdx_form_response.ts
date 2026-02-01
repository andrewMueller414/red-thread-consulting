import { z } from "zod";
import {
    checkboxPropsSchema,
    ReorderInputItem,
    reorderInputProps,
    selectInputPropsSchema,
    textAreaInputProps,
    textInputPropsSchema,
} from "./input_props_schemas";
import {
    dateTimeInputPropsWithFutureTense,
    dateTimeInputPropsWithYears,
} from "../../embeddable_components/inputs/datetime/date_time_input_schema";

export const formDataValueSchema = z.union([
    z.boolean(),
    z.string(),
    z.number(),
    z.date(),
    z.string().array(),
    z.number().array(),
]);

export enum InputId {
    checkbox = "cb",
    text = "text",
    textArea = "text-area",
    reorder = "reorder",
    dateTime = "dt",
    select = "select",
}

const checkboxMeta = checkboxPropsSchema.omit({ name: true });
const textInputMeta = textInputPropsSchema.omit({ name: true, maxWidth: true });
const textAreaMeta = textAreaInputProps.omit({ name: true, maxWidth: true });
const reorderMeta = reorderInputProps.omit({ name: true });
const selectMeta = selectInputPropsSchema.omit({ name: true });

const dateTimeMeta = z.union([
    dateTimeInputPropsWithFutureTense.omit({ name: true }),
    dateTimeInputPropsWithYears.omit({ name: true }),
]);

export const formDataNestedValueSchema = z.object({
    inputId: z.nativeEnum(InputId),
    value: formDataValueSchema,
    meta: z.union([
        reorderMeta,
        checkboxMeta,
        textInputMeta,
        textAreaMeta,
        dateTimeMeta,
        selectMeta,
    ]),
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

export type NestedFormValueOfType<T extends NestedFormValue["value"]> =
    NestedFormValue & { value: T };

export interface PreviewComponentProps<
    T extends string | boolean | ReorderInputItem[] | Date,
> {
    disabled?: boolean;
    valueOverride?: T;
}

export type MdxFormValue = z.infer<typeof formDataValueSchema>;

export type CheckboxMeta = z.infer<typeof checkboxMeta>;
export type TextInputMeta = z.infer<typeof textInputMeta>;
export type TextAreaMeta = z.infer<typeof textAreaMeta>;
export type ReorderMeta = z.infer<typeof reorderMeta>;
export type DateTimeMeta = z.infer<typeof dateTimeMeta>;
export type SelectMeta = z.infer<typeof selectMeta>;
