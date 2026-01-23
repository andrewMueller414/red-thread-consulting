import { OnboardingResponse } from "@/lib/generated/prisma/client";
import React, { type ReactNode } from "react";
import {
    OnboardingResponseSectionDescription,
    OnboardingResponseViewTitle,
} from "./onboarding_response_view_typography";
import { OnboardingResponseLabeledText } from "./onboarding_response_labeled_text";
import { priorityIdLabelMap } from "@/features/onboarding/onboarding_form/form_inputs/priorities_reorder/priority_id_label_map";
import { OnboardingResponseViewReviewedSection } from "./onboarding_response_viewed_section";

interface OnboardingResponseViewContainerProps {
    item: OnboardingResponse;
}

export const OnboardingResponseViewContainer = ({
    item,
}: OnboardingResponseViewContainerProps): ReactNode => {
    console.log("item: ", item);
    return (
        <div className="w-full max-w-[min(1080px,90vw)] py-16 px-8 lg:px-12 space-y-8">
            <OnboardingResponseViewTitle>Details</OnboardingResponseViewTitle>

            <div className="w-full flex flex-col justify-start items-start md:grid md:grid-cols-2 md:gap-x-4 gap-y-8">
                <OnboardingResponseLabeledText
                    label="Last Name"
                    value={item.name_last}
                />

                <OnboardingResponseLabeledText
                    label="First Name"
                    value={item.name_first}
                />
            </div>
            <OnboardingResponseLabeledText
                label="How can I help?"
                value={item.how_can_i_help}
            />
            <OnboardingResponseViewTitle className="mb-0">
                Priorities
            </OnboardingResponseViewTitle>
            <OnboardingResponseSectionDescription className="indent-4">
                Ordered from highest priority to lowest.
            </OnboardingResponseSectionDescription>
            <div className="w-full flex flex-col justify-start items-start gap-1">
                {item.priorities.map((priorityId) => {
                    return (
                        <div
                            key={`onboarding-response-${priorityId}`}
                            className="w-full px-3 py-2 bg-moss text-fog rounded"
                        >
                            {priorityIdLabelMap[priorityId]}
                        </div>
                    );
                })}
            </div>
            <OnboardingResponseViewReviewedSection item={item} />
        </div>
    );
};

OnboardingResponseViewContainer.displayName = "OnboardingResponseViewContainer";
