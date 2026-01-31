import { FormResponse } from "@/lib/generated/prisma/client";
import React, { type ReactNode } from "react";
import { OnboardingResponseViewReviewedSection } from "./onboarding_response_viewed_section";
import { OnboardingSummaryResponseItem } from "../../../trpc/trpc_types";

interface OnboardingResponseViewContainerProps {
    item: Exclude<OnboardingSummaryResponseItem, false>;
}

export const OnboardingResponseViewContainer = ({
    item,
}: OnboardingResponseViewContainerProps): ReactNode => {
    return (
        <div className="w-full max-w-[min(1080px,90vw)] py-16 px-8 lg:px-12 space-y-8">
            <OnboardingResponseViewReviewedSection item={item} />
        </div>
    );
};

OnboardingResponseViewContainer.displayName = "OnboardingResponseViewContainer";
