import React, { type ReactNode } from "react";
import z from "zod";
import { cn } from "../../../../../lib/utils";

const alignPropsSchema = z.object({
    vertical: z
        .union([z.literal("top"), z.literal("bottom"), z.literal("center")])
        .default("center")
        .transform((t) => {
            switch (t) {
                case "top":
                    return "justify-start";
                case "center":
                    return "justify-center";
                case "bottom":
                    return "justify-end";
            }
        }),
    horizontal: z
        .union([z.literal("left"), z.literal("right"), z.literal("center")])
        .default("center")
        .transform((t) => {
            switch (t) {
                case "left":
                    return "items-start";
                case "right":
                    return "items-end";
                case "center":
                    return "items-center";
            }
        }),
    width: z
        .union([z.literal("fit"), z.literal("full")])
        .default("full")
        .transform((t) => {
            switch (t) {
                case "fit":
                    return "w-fit";
                case "full":
                    return "w-full";
            }
        }),
});

export type AlignmentProps = z.infer<typeof alignPropsSchema> & {
    children: ReactNode;
};

export const EmbeddableAlignmentComponent = ({
    children,
    ..._props
}: AlignmentProps): ReactNode => {
    const { vertical, horizontal, width } = alignPropsSchema.parse(_props);
    return (
        <div className={cn("h-full flex flex-col", vertical, horizontal, width)}>
            {children}
        </div>
    );
};

EmbeddableAlignmentComponent.displayName = "EmbeddableAlignmentComponent";
