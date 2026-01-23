import React, { type ReactNode } from "react";
import { PrioritiesReorderContainer } from "../form_inputs/priorities_reorder/priorities_reorder_container";
import { OnboardingFormType } from "../../onboarding_types";

interface PriorityReorderFormSectionProps {
    form: OnboardingFormType;
}

export const PriorityReorderFormSection = ({
    form,
}: PriorityReorderFormSectionProps): ReactNode => {
    return (
        <div className="w-full max-w-270 flex flex-col justify-center items-start">
            <PrioritiesReorderContainer form={form} />
        </div>
    );
};

PriorityReorderFormSection.displayName = "PriorityReorderFormSection";
