import z from "zod";

export const themeColors = [
    "cream",
    "matcha",
    "fog",
    "mist",
    "pine",
    "moss",
    "dust",
] as const;

export type ThemeColor = (typeof themeColors)[number];

export const colorEnum = z.enum(themeColors);

export const colorEnumRecord = z.object({
    cream: z.boolean().optional(),
    matcha: z.boolean().optional(),
    fog: z.boolean().optional(),
    mist: z.boolean().optional(),
    pine: z.boolean().optional(),
    moss: z.boolean().optional(),
    dust: z.boolean().optional(),
});

export type ThemeColorRecord = z.infer<typeof colorEnumRecord>;

export const foregroundColorClass = colorEnum.transform((c) => {
    switch (c) {
        case "cream": {
            return "text-cream";
        }
        case "matcha": {
            return "text-matcha";
        }
        case "fog": {
            return "text-fog";
        }
        case "mist": {
            return "text-mist";
        }
        case "pine": {
            return "text-pine";
        }
        case "moss": {
            return "text-moss";
        }
        case "dust": {
            return "text-dust";
        }
    }
});

export const backgroundClass = colorEnum.transform((c) => {
    switch (c) {
        case "cream": {
            return "bg-cream text-pine";
        }
        case "matcha": {
            return "bg-matcha text-pine";
        }
        case "fog": {
            return "bg-fog text-pine";
        }
        case "mist": {
            return "bg-mist text-fog";
        }
        case "pine": {
            return "bg-pine text-fog";
        }
        case "moss": {
            return "bg-moss text-fog";
        }
        case "dust": {
            return "bg-dust text-fog";
        }
    }
});

export const firstThemeColorValue = (
    data: z.infer<typeof colorEnumRecord>,
): ThemeColor | undefined => {
    for (const t of themeColors) {
        if (data[t] === true) {
            return t;
        }
    }
};

export const themeColorBackgroundRecordToString = (
    data: z.infer<typeof colorEnumRecord>,
) => {
    const firstKey = firstThemeColorValue(data);
    if (firstKey) {
        return backgroundClass.parse(firstKey);
    } else {
        return "";
    }
};

export const themeColorForegroundRecordToString = (
    data: z.infer<typeof colorEnumRecord>,
) => {
    const firstKey = firstThemeColorValue(data);
    if (firstKey) {
        return foregroundColorClass.parse(firstKey);
    } else {
        return "";
    }
};

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
