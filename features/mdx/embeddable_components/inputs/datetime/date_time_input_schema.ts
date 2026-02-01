import z from "zod";
import { embeddableInputSchema } from "../../shared_schemas";

const dateTimeSchemaBase = embeddableInputSchema.extend({
    dateLabel: z.string().default("Date"),
    datePlaceholder: z.string().default("Select date"),
    timeLabel: z.string().default("Time"),
    time: z.boolean().default(false),
});

export const dateTimeInputPropsWithFutureTense = dateTimeSchemaBase.extend({
    past: z.boolean(),
    future: z.boolean(),
});

export const dateTimeInputPropsWithYears = dateTimeSchemaBase.extend({
    toYear: z.number().int().optional(),
    fromYear: z.number().int().optional(),
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
