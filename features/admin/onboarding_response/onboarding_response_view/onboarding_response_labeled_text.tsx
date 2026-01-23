import { cn } from "@/lib/utils";
import React, { type ReactNode } from "react";

interface OnboardingResponseLabeledTextProps {
    value: ReactNode;
    label: ReactNode;
    classes?: {
        container?: string;
        label?: string;
        value?: string;
    };
}

export const OnboardingResponseLabeledText = ({
    value,
    label,
    classes = {},
}: OnboardingResponseLabeledTextProps): ReactNode => {
    return (
        <div
            className={cn("flex flex-col justify-end items-start", classes.container)}
        >
            <div className={cn("text-sm", classes.container)}>{label}</div>
            <div className={cn("font-mono indent-4", classes.container)}>{value}</div>
        </div>
    );
};

OnboardingResponseLabeledText.displayName = "OnboardingResponseLabeledText";
