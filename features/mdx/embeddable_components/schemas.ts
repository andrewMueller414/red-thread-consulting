import { z } from "zod";
import { embeddableInputSchema } from "./shared_schemas";

export const textInputPropsSchema = embeddableInputSchema.extend({
    label: z.string({ message: "A label is required" }),
    name: z
        .string({ message: "A name field is required." })
        .min(1, "Include a name that isn't empty."),
    placeholder: z.string().optional(),
    maxWidth: z.enum(["small", "medium", "large", "full"]).default("full"),
});

export type TextInputProps = z.infer<typeof textInputPropsSchema>;
