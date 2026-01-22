import React, { type ReactNode } from "react";

/* TODO: Remove me. */
export interface OnboardingResponse {
    name: {
        first: string;
        last: string;
    };
}

interface OnboardingResponseTableContainerProps {
    items: OnboardingResponse[];
}

export const OnboardingResponseTableContainer = (
    props: OnboardingResponseTableContainerProps,
): ReactNode => {
    return (
        <div className="max-w-[min(1080px,90vw)]">Response table goes here.</div>
    );
};

OnboardingResponseTableContainer.displayName =
    "OnboardingResponseTableContainer";
