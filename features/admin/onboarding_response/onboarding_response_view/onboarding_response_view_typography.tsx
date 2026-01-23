import { cn } from "@/lib/utils";
import React, { type ReactNode } from "react";

interface OnboardingResponseViewTitleProps {
    children: ReactNode;
    className?: string;
}

export const OnboardingResponseViewTitle = ({
    children,
    className,
}: OnboardingResponseViewTitleProps): ReactNode => {
    return (
        <h2 className={cn("text-3xl font-bellefair text-pine mb-6", className)}>
            {children}
        </h2>
    );
};

OnboardingResponseViewTitle.displayName = "OnboardingResponseViewTitle";

export const OnboardingResponseSubtitle = ({
    children,
    className,
}: OnboardingResponseViewTitleProps): ReactNode => {
    return (
        <h3 className={cn("text-2xl text-pine font-bellefair", className)}>
            {children}
        </h3>
    );
};

OnboardingResponseSubtitle.displayName = "OnboardingResponseSubtitle";

export const OnboardingResponseSectionDescription = ({
    children,
    className,
}: OnboardingResponseViewTitleProps): ReactNode => {
    return (
        <p className={cn("text-sm text-moss font-mono", className)}>{children}</p>
    );
};

OnboardingResponseSectionDescription.displayName =
    "OnboardingResponseSectionDescription";
