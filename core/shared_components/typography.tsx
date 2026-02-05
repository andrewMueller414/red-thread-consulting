import { EmbeddabledTitleProps } from "@/features/mdx/data/schemas/input_props_schemas";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface TypographyProps extends Partial<Pick<EmbeddabledTitleProps, "font">> {
    children: ReactNode;
    className?: string;
}

export const H1 = ({
    children,
    className,
    font,
}: TypographyProps): ReactNode => {
    return (
        <h1
            className={cn(
                "text-3xl @5xl/mdx:text-4xl font-bellefair",
                font,
                className,
            )}
        >
            {children}
        </h1>
    );
};

export const H2 = ({
    children,
    className,
    font,
}: TypographyProps): ReactNode => {
    return (
        <h2
            className={cn(
                "text-2xl w-full text-dust font-bellefair",
                font,
                className,
            )}
        >
            {children}
        </h2>
    );
};

export const H3 = ({
    children,
    className,
    font,
}: TypographyProps): ReactNode => {
    return (
        <h3 className={cn("text-xl w-full text-moss", font, className)}>
            {children}
        </h3>
    );
};

export const H4 = ({
    children,
    className,
    font,
}: TypographyProps): ReactNode => {
    return (
        <h4 className={cn("text-xl text-moss font-semibold", font, className)}>
            {children}
        </h4>
    );
};

export const H5 = ({
    children,
    className,
    font,
}: TypographyProps): ReactNode => {
    return (
        <h5 className={cn("text-mist text-xl font-semibold", font, className)}>
            {children}
        </h5>
    );
};

export const H6 = ({
    children,
    className,
    font,
}: TypographyProps): ReactNode => {
    return (
        <h6 className={cn("text-pine text-lg font-semibold", font, className)}>
            {children}
        </h6>
    );
};
