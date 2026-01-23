import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { OnboardingFormData } from "./data/onboarding_form_schema";

export interface OnboardingFormSectionItem {
    title: string;
    subtitle: string;
    Body: FC<{ form: OnboardingFormType; float: "right" | "left" }>;
    image: {
        src: string;
        alt: string;
    };
}

export type OnboardingFormType = UseFormReturn<OnboardingFormData>;
