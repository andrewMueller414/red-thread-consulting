import { ThemeColor } from "../../../features/mdx/embeddable_components/shared_schemas";

export interface ThemeColorGroup {
    foreground: ThemeColor;
    background: ThemeColor;
}

export const themeColorGroups: ThemeColorGroup[] = [
    {
        background: "cream",
        foreground: "dust",
    },
    {
        background: "matcha",
        foreground: "pine",
    },
    {
        background: "fog",
        foreground: "pine",
    },
    {
        background: "mist",
        foreground: "fog",
    },
    {
        background: "pine",
        foreground: "fog",
    },
    {
        background: "moss",
        foreground: "fog",
    },
    {
        background: "dust",
        foreground: "fog",
    },
];
