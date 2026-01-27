import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface TypographyProps {
    children: ReactNode;
    className?: string;
}

export const H1 = ({ children, className }: TypographyProps): ReactNode => {
    return (
        <h1 className={cn("text-3xl font-bellefair", className)}>{children}</h1>
    );
};

export const H2 = ({ children, className }: TypographyProps): ReactNode => {
    return (
        <h2 className={cn("text-2xl w-full text-moss", className)}>{children}</h2>
    );
};

export const H3 = ({ children, className }: TypographyProps): ReactNode => {
    return (
        <h3 className={cn("text-xl w-full text-moss", className)}>{children}</h3>
    );
};

export const H4 = ({ children, className }: TypographyProps): ReactNode => {
    return <h4 className={cn("", className)}>{children}</h4>;
};
