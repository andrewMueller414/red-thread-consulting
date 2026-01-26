import { FormSectionTitle } from "@/features/onboarding/onboarding_form/onboarding_form_section_typography";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface TypographyProps {
    children: ReactNode;
    className?: string;
}

export const H1 = ({ children, className }: TypographyProps): ReactNode => {
    return (
        <FormSectionTitle float="left" className={className}>
            {children}
        </FormSectionTitle>
    );
};

export const H2 = ({ children, className }: TypographyProps): ReactNode => {
    return (
        <h2
            className={cn(
                "text-2xl w-full text-moss text-center @5xl/mdx:text-left @5xl/mdx:pl-4",
                className,
            )}
        >
            {children}
        </h2>
    );
};
export const H3 = ({ children, className }: TypographyProps): ReactNode => {
    return (
        <h3
            className={cn(
                "text-xl w-full text-moss text-center @5xl/mdx:text-left",
                className,
            )}
        >
            {children}
        </h3>
    );
};
export const H4 = ({ children, className }: TypographyProps): ReactNode => {
    return <h4 className={cn("", className)}>{children}</h4>;
};
