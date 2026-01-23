import React, { type ReactNode } from "react";
import {
    OnboardingFormSectionItem,
    OnboardingFormType,
} from "../onboarding_types";
import { OnboardingSectionImage } from "./onboarding_section_image";
import { OnboardingSectionForm } from "./onboarding_section_form";
import { cn } from "@/lib/utils";

interface OnboardingFormSectionProps {
    item: OnboardingFormSectionItem;
    idx: number;
    form: OnboardingFormType;
}

const SectionContainer = ({
    children,
    className,
}: {
    className?: string;
    children: ReactNode;
}): ReactNode => {
    return (
        <div
            className={cn(
                "w-full max-w-270 flex flex-col lg:grid lg:grid-cols-2 px-8 md:px-12 my-8 gap-x-6",
                className,
            )}
        >
            {children}
        </div>
    );
};

export const OnboardingFormSection = ({
    item,
    idx,
    form,
}: OnboardingFormSectionProps): ReactNode => {
    const imageLeft = idx % 2 === 0;
    if (imageLeft) {
        return (
            <SectionContainer>
                <OnboardingSectionImage priority={idx <= 2} image={item.image} />
                <OnboardingSectionForm form={form} item={item} float={"right"} />
            </SectionContainer>
        );
    } else {
        return (
            <SectionContainer className="flex-col-reverse">
                <OnboardingSectionForm form={form} item={item} float={"left"} />
                <OnboardingSectionImage priority={idx <= 2} image={item.image} />
            </SectionContainer>
        );
    }
};

OnboardingFormSection.displayName = "OnboardingFormSection";
