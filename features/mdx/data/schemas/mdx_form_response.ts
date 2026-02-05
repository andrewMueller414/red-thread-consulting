import { z } from "zod";
import {
    checkboxPropsSchema,
    reorderInputProps,
    reorderItemSchema,
    selectInputPropsSchema,
    sliderPropsSchema,
    textAreaInputProps,
    textInputPropsSchema,
} from "./input_props_schemas";
import {
    dateTimeInputPropsWithFutureTense,
    dateTimeInputPropsWithYears,
} from "../../embeddable_components/inputs/datetime/date_time_input_schema";
import { FormResponse } from "@/lib/generated/prisma/client";

export const formDataValueSchema = z.union([
    z.boolean(),
    z.string(),
    z.number(),
    z.date(),
    z.string().array(),
    z.number().array(),
    reorderItemSchema.array(),
]);

export enum InputId {
    checkbox = "cb",
    text = "text",
    textArea = "ta",
    reorder = "reorder",
    dateTime = "dt",
    select = "select",
    slider = "slider",
}

const checkboxMeta = checkboxPropsSchema;
const textInputMeta = textInputPropsSchema;
const textAreaMeta = textAreaInputProps;
const reorderMeta = reorderInputProps;
const selectMeta = selectInputPropsSchema;
const sliderMeta = sliderPropsSchema;

const dateTimeMeta = z.union([
    dateTimeInputPropsWithFutureTense,
    dateTimeInputPropsWithYears,
]);

export const formDataNestedValueSchema = z.object({
    inputId: z.nativeEnum(InputId),
    value: formDataValueSchema,
    meta: z.union([
        selectMeta,
        reorderMeta,
        checkboxMeta,
        textInputMeta,
        textAreaMeta,
        dateTimeMeta,
        sliderMeta,
    ]),
});

export const formDataSchema = z.record(z.string(), formDataNestedValueSchema);

export type MdxFormData = z.infer<typeof formDataSchema>;

export type NestedFormValue = z.infer<typeof formDataNestedValueSchema>;

export type TypedFormResponse<T = MdxFormData> = Omit<FormResponse, "data"> & {
    data: T;
};

export const mdxFormSchema = z.object({
    id: z.number().int(),
    data: formDataSchema,
    // formFieldNames: z.string().array().default([]),
    mdxSourceId: z.string(),
    ctime: z.date(),
    reviewed_at: z.date().nullable(),
}) satisfies z.ZodType<TypedFormResponse>;

export type MdxFormValue = z.infer<typeof formDataValueSchema>;

export type MdxForm = z.infer<typeof mdxFormSchema>;
/** The input of the MdxForm type and mdxForm schema. */
export type MdxFormInput = z.input<typeof mdxFormSchema>;

export type NestedFormValueOfType<T extends NestedFormValue["value"]> =
    NestedFormValue & { value: T };

export type CheckboxMeta = z.output<typeof checkboxMeta>;
export type TextInputMeta = z.output<typeof textInputMeta>;
export type TextAreaMeta = z.output<typeof textAreaMeta>;
export type ReorderMeta = z.output<typeof reorderMeta>;
export type DateTimeMeta = z.output<typeof dateTimeMeta>;
export type SelectMeta = z.output<typeof selectMeta>;
export type SliderMeta = z.output<typeof sliderMeta>;

export type AnyMeta = NestedFormValue["meta"];

export interface PreviewComponentProps<
    T extends MdxFormValue,
    Meta extends AnyMeta,
> {
    disabled?: boolean;
    valueOverride?: T;
    meta?: Meta;
}
