import z from "zod";

export const reorderInputProps = z.object({
    options: z
        .object({
            title: z
                .string({ message: "A title is required" })
                .min(1, "Please include a title that isn't empty"),
            subtitle: z.string().optional(),
            value: z.string().or(z.number()),
        })
        .array(),
    title: z.string().optional(),
    subtitle: z.string().optional(),
    name: z.string({ message: "You must include a name for all inputs." }),
});

export type ReorderInputProps = z.infer<typeof reorderInputProps>;
export type ReorderInputItem = z.infer<
    typeof reorderInputProps
>["options"][number];
