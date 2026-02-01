import z from "zod";
import { embeddableInputSchema } from "../../shared_schemas";

export const dateTimeInputSchema = embeddableInputSchema.extend({
    dateLabel: z.string().default("Date"),
    datePlaceholder: z.string().default("Select date"),
    timeLabel: z.string().default("Time"),
});

export type DateTimeInputSchema = z.infer<typeof dateTimeInputSchema>;
export type DateTimeInputSchemaOutput = z.output<typeof dateTimeInputSchema>;

export interface DateTimeNestedInputProps {
    setDate: (newDate: Date) => void;
}
