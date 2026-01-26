import { cn } from "@/lib/utils";
import React, { type ReactNode } from "react";

interface FormSectionTypographyProps {
    children: ReactNode;
    className?: string;
    float: "left" | "right" | "full-width";
}

export const FormSectionTitle = ({
    children,
    className,
    float,
}: FormSectionTypographyProps): ReactNode => {
    return (
        <div
            className={cn(
                "text-3xl font-bellefair text-center",
                float === "right"
                    ? "@5xl/mdx:w-full @5xl/mdx:text-right"
                    : "@5xl/mdx:text-left",
                className,
            )}
        >
            {children}
        </div>
    );
};

FormSectionTitle.displayName = "FormSectionTitle";

export const FormSectionSubtitle = ({
    children,
    className,
    float,
}: FormSectionTypographyProps): ReactNode => {
    return (
        <div
            className={cn(
                "text-moss text-sm text-center",
                float === "right"
                    ? "@5xl/mdx:w-full @5xl/mdx:text-right"
                    : "@5xl/mdx:text-left",
                className,
            )}
        >
            {children}
        </div>
    );
};

FormSectionSubtitle.displayName = "FormSectionSubtitle";
