import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { OnboardingFormData } from "./data/onboarding_form_schema";
import { PriorityId } from "@/lib/generated/prisma/enums";

export interface OnboardingResponse {
  ///FAKE:faker.lorem.words(1)
  /// @zod.min(2, "Please provide a first name.")
  name_first: string;
  ///FAKE:faker.lorem.words(1)
  /// @zod.min(2, "Please provide a last name.")
  name_last: string;
  ///FAKE:faker.lorem.paragraphs(2)
  /// @zod.min(2, "Can you provide more information about how I can help?.")
  how_can_i_help: string;
  priorities: PriorityId[];
}

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
