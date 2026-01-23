import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { OnboardingFormData } from "./data/onboarding_form_schema";
import { PriorityId } from "@/lib/generated/schemas";

export interface OnboardingImageData {
    src: string;
    alt: string;
}

export interface OnboardingFormSectionItem {
    title: string;
    subtitle: string;
    Body: FC<{
        form: OnboardingFormType;
        float: "right" | "left" | "full-width";
    }>;
    /// If set to "full-width-body", the image will not be rendered and the body will be given the full width of the container, instead of a grid based layout.
    image: OnboardingImageData | "full-width-body";
}

export type OnboardingFormType = UseFormReturn<OnboardingFormData>;

export interface PriorityItem {
    label: string;
    value: PriorityId;
}

export type OnboardingFullWidthFormSectionItem = OnboardingFormSectionItem & {
    image: "full-width-body";
};

export type OnboardingGridLayoutFormSectionItem = OnboardingFormSectionItem & {
    image: OnboardingImageData;
};
