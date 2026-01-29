import z from "zod";

export const embeddableInputSchema = z.object({
    name: z
        .string({
            message:
                "Please provide a unique name that never changes. This will be associated with this data in the database, so once data is collected, it's important that this doesn't change.",
        })
        .describe(
            "The `name` field is associated with this data in the database, and used for searching and organizing the data, so it's important that this does not change once a user has submitted a response associated with the article.",
        )
        .min(1, "The name field cannot be empty."),
});
