import { OnboardingResponse } from "@/lib/generated/prisma/client";
import React, { type ReactNode } from "react";

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
