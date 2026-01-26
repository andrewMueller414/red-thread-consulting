import React, { type ReactNode } from "react";
import {
    OnboardingFormSectionItem,
    OnboardingFormType,
} from "../onboarding_types";
import { cn } from "@/lib/utils";
import {
    FormSectionSubtitle,
    FormSectionTitle,
} from "./onboarding_form_section_typography";

interface OnboardingSectionFormProps {
    item: OnboardingFormSectionItem;
    float: "right" | "left";
    form: OnboardingFormType;
}

export const OnboardingSectionForm = ({
    item,
    float,
    form,
}: OnboardingSectionFormProps): ReactNode => {
    const { Body } = item;
    return (
        <div
            className={cn(
                "w-full h-full flex flex-col justify-start items-center mt-8 lg:mt-0",
                float === "right" ? "lg:items-start" : "lg:items-end",
            )}
        >
            <FormSectionTitle float={float === "right" ? "left" : "right"}>
                {item.title}
            </FormSectionTitle>

            <FormSectionSubtitle float={float === "right" ? "left" : "right"}>
                {item.subtitle}
            </FormSectionSubtitle>
            <div className="@container/onboarding-item-body w-full grow mt-8">
                <Body form={form} float={float} />
            </div>
        </div>
    );
};

OnboardingSectionForm.displayName = "OnboardingSectionForm";
