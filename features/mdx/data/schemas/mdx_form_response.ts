import { z } from "zod";
import {
    checkboxPropsSchema,
    getSliderColorClasses,
    parsedSizeClassesSchema,
    reorderInputProps,
    reorderItemSchema,
    selectInputPropsSchema,
    sliderPropsSchema,
    textAreaInputProps,
    textInputPropsSchema,
} from "./input_props_schemas";
import { FormResponse } from "@/lib/generated/prisma/client";
import { getSizePropsString } from "../../embeddable_components/media/image";
import {
    embeddableInputSchema,
    firstThemeColorValue,
    parsedColorPropertiesSchema,
} from "../../embeddable_components/shared_schemas";

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

const checkboxMeta = checkboxPropsSchema.extend({
    inputId: z.literal(InputId.checkbox),
});
const textInputMeta = textInputPropsSchema.extend({
    inputId: z.literal(InputId.text),
});

const textAreaMeta = textAreaInputProps
    .merge(parsedSizeClassesSchema)
    .extend({ inputId: z.literal(InputId.textArea) })
    .transform((c) => {
        return {
            ...c,
            sizeClasses: getSizePropsString(c),
        };
    });

const reorderMeta = reorderInputProps.extend({
    inputId: z.literal(InputId.reorder),
});
const selectMeta = selectInputPropsSchema.extend({
    inputId: z.literal(InputId.select),
});
const sliderMeta = sliderPropsSchema
    .merge(parsedColorPropertiesSchema.partial())
    .extend({ inputId: z.literal(InputId.slider), initial: z.number() })
    .transform((data) => {
        const firstColor = firstThemeColorValue(data);
        return {
            ...data,
            initial: data.initial ?? data.min + (data.max - data.min) / 2, // Set it to half way between max and min if it's undefined.
            color: firstColor,
            colorClasses: firstColor ? getSliderColorClasses(firstColor) : "",
        };
    });

const dateTimeSchemaBase = embeddableInputSchema.extend({
    dateLabel: z.string().default("Date"),
    datePlaceholder: z.string().default("Select date"),
    timeLabel: z.string().default("Time"),
    time: z.boolean().default(false),
});

export const dateTimeInputPropsWithFutureTense = dateTimeSchemaBase.extend({
    past: z.boolean(),
    future: z.boolean(),
    inputId: z.literal(InputId.dateTime),
});

export const dateTimeInputPropsWithYears = dateTimeSchemaBase.extend({
    toYear: z.number().int().optional(),
    fromYear: z.number().int().optional(),
    inputId: z.literal(InputId.dateTime),
});

export const dateTimeInputSchema = z.union([
    dateTimeInputPropsWithFutureTense,
    dateTimeInputPropsWithYears,
]);

export type DateTimeInputSchema = z.infer<typeof dateTimeInputSchema>;
export type DateTimeInputSchemaOutput = z.output<typeof dateTimeInputSchema>;

export interface DateTimeNestedInputProps {
    setDate: (newDate: Date) => void;
}

const dateTimeMeta = z.union([
    dateTimeInputPropsWithFutureTense,
    dateTimeInputPropsWithYears,
]);

export const formDataNestedValueSchema = z.object({
    inputId: z.nativeEnum(InputId),
    value: formDataValueSchema,
    meta: z.union([
        sliderMeta,
        selectMeta,
        reorderMeta,
        checkboxMeta,
        textInputMeta,
        textAreaMeta,
        dateTimeMeta,
        z.any(), // Hack to avoid rewriting all of the schemas for the output of the original schema just to render components with the form disabled.
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
