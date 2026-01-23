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
}: Omit<FormSectionTypographyProps, "float">): ReactNode => {
    return (
        <div className={cn("text-3xl font-bellefair", className)}>{children}</div>
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
                float === "left" ? "lg:w-full lg:text-right" : "lg:text-left",
                className,
            )}
        >
            {children}
        </div>
    );
};

FormSectionSubtitle.displayName = "FormSectionSubtitle";
