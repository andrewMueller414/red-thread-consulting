import React, { type ReactNode } from "react";
import z from "zod";
import styles from "./form_grid_styles.module.scss";
import { cn } from "../../../../../lib/utils";
import { getSizePropsString, sizePropsObject } from "../../media/image";

const formGridProps = sizePropsObject
    .extend({
        columns: z
            .number({
                message:
                    "Did you put this in quotations? This property needs to be a number.",
            })
            .int({
                message:
                    "Please make sure the number is an integer, without any decimals.",
            })
            .max(
                12,
                "I had to hard code the columns, so I only went up to 12. Let the developer know if having a greater number of columns would improve your use case.",
            )
            .or(
                z.object({
                    small: z.number().int().optional(),
                    medium: z.number().int().optional(),
                    large: z.number().int().optional(),
                }),
            )
            .default({
                small: 1,
                medium: 1,
                large: 2,
            })
            .transform((a) => {
                if (typeof a === "number") {
                    return {
                        small: a,
                        medium: a,
                        large: a,
                    };
                } else {
                    return {
                        small: a.small ?? 1,
                        medium: a.medium ?? 1,
                        large: a.large ?? 2,
                    };
                }
            }),
        reverse: z
            .boolean()
            .default(false)
            .transform((t) => (t ? "flex-col-reverse" : "flex-col")),
    })
    .transform((c) => {
        return {
            ...c,
            sizeClasses: getSizePropsString(c),
        };
    });

export type FormGridProps = z.infer<typeof formGridProps> & {
    children: ReactNode;
};

export const FormGrid = ({ children, ...props }: FormGridProps): ReactNode => {
    const { columns, reverse, sizeClasses } = formGridProps.parse(props);
    const classKeys = [
        `formGridSmall${columns.small}`,
        `formGridMedium${columns.medium}`,
        `formGridLarge${columns.large}`,
    ].map((k) => styles[k]);
    return (
        <div
            className={cn(
                "w-full [&>p]:w-fit",
                reverse,
                styles.formGrid,
                ...classKeys,
                sizeClasses,
            )}
        >
            {children}
        </div>
    );
};

FormGrid.displayName = "FormGrid";
