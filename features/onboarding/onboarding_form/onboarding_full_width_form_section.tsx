import React, { type ReactNode } from "react";
import {
    OnboardingFormType,
    OnboardingFullWidthFormSectionItem,
} from "../onboarding_types";
import {
    FormSectionTitle,
    FormSectionSubtitle,
} from "./onboarding_form_section_typography";

interface OnboardingFullWidthFormSectionProps {
    item: OnboardingFullWidthFormSectionItem;
    float: "full-width";
    form: OnboardingFormType;
}

export const OnboardingFullWidthFormSection = ({
    item,
    form,
    float,
}: OnboardingFullWidthFormSectionProps): ReactNode => {
    const { Body } = item;
    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div className="w-full max-w-[min(1080px,90vw)] flex flex-col justify-center items-center lg:items-start">
                <FormSectionTitle float="left">{item.title}</FormSectionTitle>
                <FormSectionSubtitle float={"left"}>
                    {item.subtitle}
                </FormSectionSubtitle>
                <Body form={form} float="full-width" />
            </div>
        </div>
    );
};

OnboardingFullWidthFormSection.displayName = "OnboardingFullWidthFormSection";
