import { TextInputProps } from "../data/schemas/input_props_schemas";

export const getMaxWidthProp = (
    maxWidth: TextInputProps["maxWidth"],
): string => {
    switch (maxWidth) {
        case "full":
            return "w-full";
        case "small":
            return "w-full @5xl/mdx:max-w-60";
        case "medium":
            return "w-full @5xl/mdx:max-w-120";
        case "large":
            return "w-full @5xl/mdx:max-w-180";
    }
};
